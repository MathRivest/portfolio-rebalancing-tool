import _ from 'lodash';
import axios from 'axios';
import format from 'string-format';

class PortfolioSvc {
    constructor() {
        this.baseUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22{0}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;
    }

    getSecurities = (symbols) => {
        return this._getYahooSecurities(symbols)
            .catch(() => {
                return symbols.map(symbol => {
                    return {
                        symbol: symbol,
                        cost: null
                    }
                })
            });
    }

    _getYahooSecurities = (symbols) => {
        let symbolList = _.join(symbols, ',');
        let url = format(this.baseUrl, symbolList);
        return axios.get(url)
            .then((resp) => {
                let data = null,
                    count = resp.data.query.count;
                if(count > 1) {
                    data = resp.data.query.results.quote;
                } else if(count === 1) {
                    data = [resp.data.query.results.quote];
                } else {
                    data = [];
                }
                // Pick stuff
                return data.map(security => {
                    return {
                        symbol: security.symbol,
                        cost: security.Ask ? parseFloat(security.Ask): null
                    }
                })
            });
    }

    saveAccounts = (accounts) => {
        // clean up accounts to keep symbols and mkt val
        localStorage.setItem('portfolio-accounts', JSON.stringify(accounts));
    }

    getAccounts() {
        const accounts = JSON.parse(localStorage.getItem('portfolio-accounts')) || [];
        return accounts;
    }
}

let PortfolioService = new PortfolioSvc();
export default PortfolioService;