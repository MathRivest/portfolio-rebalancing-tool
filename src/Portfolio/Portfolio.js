import React from 'react';

import PortfolioService from './PortfolioService';

import * as PortfolioHelpers from './PortfolioHelpers';
import * as SecurityHelpers from './Security/SecurityHelpers';

import SecurityList from './Security/SecurityList';
import SecurityGraphs from './Security/SecurityGraphs';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            securities: [
                {
                    id: PortfolioHelpers.guid(),
                    symbol: 'VUN.TO',
                    cost: 0,
                    portPercentTarget: 25,
                    mktValue: 3825.00,
                    buyQty: 0
                },
                {
                    id: PortfolioHelpers.guid(),
                    symbol: 'VCN.TO',
                    cost: 0,
                    portPercentTarget: 25,
                    mktValue: 3753.94,
                    buyQty: 0
                },
                {
                    id: PortfolioHelpers.guid(),
                    symbol: 'VAB.TO',
                    cost: 0,
                    portPercentTarget: 20,
                    mktValue: 3052.66,
                    buyQty: 0
                },
                {
                    id: PortfolioHelpers.guid(),
                    symbol: 'VDU.TO',
                    cost: 0,
                    portPercentTarget: 20,
                    mktValue: 3050.96,
                    buyQty: 0
                },
                {
                    id: PortfolioHelpers.guid(),
                    symbol: 'ZRE.TO',
                    cost: 0,
                    portPercentTarget: 10,
                    mktValue: 1659.68,
                    buyQty: 0
                }
            ],
            cash: {
                symbol: 'Cash',
                mktValue: 2000,
                portPercentTarget: 0
            }
        }
    }

    getSecurities = () => {
        const symbols = this.state.securities.map((security) => {
            return security.symbol;
        });

        PortfolioService.getSecurities(symbols)
            .then((resp) => {
                this.setState((prevState, props) => PortfolioHelpers.updateSecurities(prevState, resp));
            });
    }

    componentDidMount() {
        this.getSecurities();
    }

    handleSecurityRemove = (security) => {
        this.setState((prevState, props) => PortfolioHelpers.removeSecurity(prevState, security));

        this.setState((prevState, props) => {
            if(prevState.securities.length === 0) {
                return PortfolioHelpers.addSecurity(prevState, PortfolioHelpers.createSecurity());
            }
        });
    }

    handleSecurityChange = (security) => {
        this.setState((prevState, props) => PortfolioHelpers.updateSecurity(prevState, security));
    }

    handleSecurityNameChange = (security) => {
        PortfolioService.getSecurities([security.symbol])
            .then((resp) => {
                this.setState((prevState, props) => PortfolioHelpers.updateSecurity(prevState, security, resp[0]));
            });
    }

    handleCashChange = (cash) => {
        this.setState({
            cash
        });
    }

    handleRefreshButtonClick = () => {
        this.getSecurities();
    }

    handleAddButtonClick = () => {
        this.setState((prevState, props) => PortfolioHelpers.addSecurity(prevState, PortfolioHelpers.createSecurity()));
    }

    handleBalancePortfolioButtonClick = () => {
        let balancedSecurities = SecurityHelpers.getBalanceList(this.state.securities, this.state.cash);
        this.setState((prevState, props) => PortfolioHelpers.updateSecurities(prevState, balancedSecurities));
    }

    render() {
        const total = SecurityHelpers.getTotalWithCash(this.state.securities, this.state.cash, 'mktValue');
        return(
            <div className="Portfolio">

                <SecurityGraphs/>

                <div className="Portfolio-actions">
                    <button onClick={this.handleAddButtonClick}>Add Security</button>
                    <button onClick={this.handleRefreshButtonClick}>Refresh Quotes</button>
                    <button onClick={this.handleBalancePortfolioButtonClick}>Balance Portfolio</button>
                </div>

                <SecurityList
                    securities={this.state.securities}
                    onSecurityChange={this.handleSecurityChange}
                    onSecurityNameChange={this.handleSecurityNameChange}
                    onSecurityRemove={this.handleSecurityRemove}
                    cash={this.state.cash}
                    onCashChange={this.handleCashChange}
                    total={total}/>

                <br/>
                Portfolio todo:
                <ul>
                    <li>Rebalance button</li>
                    <li>Add styles</li>
                    <li>Add graphs</li>
                </ul>
            </div>
        )
    }
}

export default Portfolio;