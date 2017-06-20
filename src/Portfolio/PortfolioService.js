import _ from 'lodash';
import axios from 'axios';

class PortfolioSvc {
    getSecurities = (symbols) => {
        let symbolList = _.join(symbols, ',');
        let url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbolList}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;
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