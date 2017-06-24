import React from 'react';
import './Portfolio.css';
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
                    portPercentTarget: 15,
                    mktValue: 3753.94,
                    buyQty: 0
                },
                {
                    id: PortfolioHelpers.guid(),
                    symbol: 'VAB.TO',
                    cost: 0,
                    portPercentTarget: 10,
                    mktValue: 3052.66,
                    buyQty: 0
                },
                {
                    id: PortfolioHelpers.guid(),
                    symbol: 'VDU.TO',
                    cost: 0,
                    portPercentTarget: 10,
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
                },
                {
                    id: PortfolioHelpers.guid(),
                    symbol: 'TSLA',
                    cost: 0,
                    portPercentTarget: 10,
                    mktValue: 0,
                    buyQty: 0
                }
            ],
            cash: {
                symbol: 'Cash',
                mktValue: 2000,
                portPercentTarget: 0
            },
            balancingConfiguration: {
                buyOnly: true
            }
        }
    }

    setSecurities = () => {
        const symbols = this.state.securities.map((security) => {
            return security.symbol;
        });

        PortfolioService.getSecurities(symbols)
            .then((resp) => {
                this.setState((prevState, props) => PortfolioHelpers.updateSecurities(prevState, resp));
            });
    }

    componentDidMount() {
        this.setSecurities();
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
        this.setSecurities();
    }

    handleAddButtonClick = () => {
        this.setState((prevState, props) => PortfolioHelpers.addSecurity(prevState, PortfolioHelpers.createSecurity()));
    }

    handleBalancePortfolioButtonClick = () => {
        const balancedSecurities = SecurityHelpers.getBalancedList(
            this.state.balancingConfiguration,
            this.state.securities,
            this.state.cash
        );
        this.setState((prevState, props) => PortfolioHelpers.updateSecurities(prevState, balancedSecurities));
    }

    handleBalancingConfigurationBuyOnlyChange = (e) => {
        let balancingConfiguration = {
            [e.target.name]: e.target.checked
        };
        this.setState({
            balancingConfiguration: balancingConfiguration
        });
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
                    <label htmlFor="wantToSell">
                        <input
                            type="checkbox"
                            name="buyOnly"
                            checked={this.state.balancingConfiguration.buyOnly}
                            onChange={this.handleBalancingConfigurationBuyOnlyChange}/>
                            Buy Only
                    </label>
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
                    <li>Add checkbox to ask to sell or not</li>
                    <li>Add styles</li>
                    <li>Add graphs</li>
                    <li>Redux?</li>
                </ul>
            </div>
        )
    }
}

export default Portfolio;