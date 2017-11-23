import _ from 'lodash';

class Wealthica {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.basePath = 'https://api.wealthica.com/v1';

        this.headers = new Headers();
        this.headers.append('Authorization', `Bearer ${this.accessToken}`);
    }

    getAccounts() {
        const url = `${this.basePath}/positions`;
        return fetch(url, { headers: this.headers })
            .then(response => response.json())
            .then(positions => {
                console.log(positions);
                return this._digestPositions(positions);
            });
    }

    _digestPositions(positions) {
        const uniqInvestments = _.reduce(
            positions,
            (investments, position) => {
                _.forEach(position.investments, investment => {
                    if (!_.find(investments, { investment: investment.investment })) {
                        investments.push(investment);
                    }
                });
                return investments;
            },
            []
        );

        // Create accounts
        const accounts = _.chain(uniqInvestments)
            .map(uniqInvestment => {
                // Create securities
                const securities = _.chain(positions)
                    .filter(position => {
                        // Filter position without symbol and not in account
                        return (
                            position.security.symbol &&
                            _.find(position.investments, { investment: uniqInvestment.investment })
                        );
                    })
                    .map(position => {
                        const positionInvestment = _.find(position.investments, {
                            investment: uniqInvestment.investment
                        });
                        return {
                            id: position.security.id,
                            symbol: position.security.symbol,
                            cost: position.security.last_price,
                            portPercentTarget: 0,
                            mktValue: Math.round(positionInvestment.market_value * 100) / 100,
                            buyQty: 0,
                            readOnly: true
                        };
                    })
                    .value();

                return {
                    id: `${uniqInvestment.institution}-${uniqInvestment.investment}`,
                    name: uniqInvestment.investment,
                    securities: securities,
                    cash: {
                        symbol: 'Cash',
                        mktValue: 0,
                        portPercentTarget: 0
                    },
                    readOnly: true
                };
            })
            .filter(account => {
                return account.securities.length > 0;
            })
            .value();

        return accounts;
    }
}

export default Wealthica;
