import _ from 'lodash';
import axios from 'axios';

class PortfolioSvc {
    constructor() {
        this.baseUrl = 'https://finance.google.com/finance/info?client=ig&q=';
    }

    getSecurities = (symbols) => {
        let securityList = _.join(symbols, ',');
        return axios.get(this.baseUrl + securityList).then((resp) => {
            let data = JSON.parse(resp.data.replace("//", "")); // Remove comments before response
            // Pick stuff
            return data.map(security => {
                return {
                    symbol: security.t,
                    cost: security.l
                }
            })
        });
    }
}

let PortfolioService = new PortfolioSvc();
export default PortfolioService;