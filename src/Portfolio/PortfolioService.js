import _ from 'lodash';
import axios from 'axios';
import format from 'string-format';

class PortfolioSvc {
    constructor() {
        this.baseUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22{0}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;
    }

    getSecurities = (symbols) => {
        let symbolList = _.join(symbols, ',');
        let url = format(this.baseUrl, symbolList);
        return axios.get(url).then((resp) => {
            let data = resp.data.query.results.quote;
            // Pick stuff
            return data.map(security => {
                return {
                    symbol: security.symbol,
                    cost: security.Ask
                }
            })
        });
    }
}

let PortfolioService = new PortfolioSvc();
export default PortfolioService;