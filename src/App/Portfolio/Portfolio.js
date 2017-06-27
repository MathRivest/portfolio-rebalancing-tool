import React from 'react';
import './Portfolio.css';
import PortfolioService from './PortfolioService';

import * as PortfolioHelpers from './PortfolioHelpers';
import * as SecurityHelpers from './Security/SecurityHelpers';

import SecurityList from './Security/SecurityList';
import SecurityGraphs from './Security/SecurityGraphs';
import { Button } from '../Components';

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

    setDisplayColors = () => {
        this.setState((prevState, props) => PortfolioHelpers.setDisplayColors(prevState));
    }

    componentDidMount() {
        this.setSecurities();
        this.setDisplayColors();
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
        this.setDisplayColors();
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

                <SecurityGraphs
                    securities={this.state.securities}
                    cash={this.state.cash}
                    total={total}/>

                <ul className="Portfolio-actions">
                    <li>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="add"
                            onClick={this.handleAddButtonClick}>
                            Add security
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="update"
                            onClick={this.handleRefreshButtonClick}>
                            Refresh quotes
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="donut_large"
                            onClick={this.handleBalancePortfolioButtonClick}>
                            Balance
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="undo"
                            onClick={this.handleClearButtonClick}>
                            Clear Buy
                        </Button>
                    </li>
                    {/*<li>
                        <div className="Checkbox">
                            <label htmlFor="buyOnly">
                                <input
                                    id="buyOnly"
                                    type="checkbox"
                                    name="buyOnly"
                                    checked={this.state.balancingConfiguration.buyOnly}
                                    onChange={this.handleBalancingConfigurationBuyOnlyChange}/>
                                    Buy Only
                            </label>
                        </div>
                    </li>*/}
                </ul>

                <SecurityList
                    securities={this.state.securities}
                    onSecurityChange={this.handleSecurityChange}
                    onSecurityNameChange={this.handleSecurityNameChange}
                    onSecurityRemove={this.handleSecurityRemove}
                    cash={this.state.cash}
                    onCashChange={this.handleCashChange}
                    total={total}/>
            </div>
        )
    }
}

export default Portfolio;