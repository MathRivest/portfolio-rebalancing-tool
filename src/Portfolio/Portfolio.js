import React from 'react';
import _ from 'lodash';

import PortfolioService from './PortfolioService';

import { guid } from './PortfolioHelper';
import { getTotalWithCash } from './Security/SecurityHelper';

import SecurityList from './Security/SecurityList';
import SecurityGraphs from './Security/SecurityGraphs';

let createSecurity = () => {
    return {
        id: guid(),
        symbol: '',
        cost: 0,
        portPercentTarget: 0,
        mktValue: 0,
        portPercent: 0,
        buyQty: 0,
        portPercentNew: 0
    }
}

let addSecurity = (prevState, security) => {
    let updatedList = [...prevState.securities, security];
    return {
        securities: updatedList
    }
}

let removeSecurity = (prevState, security) => {
    let updatedList = _.filter(prevState.securities, item => {
        return item.id !== security.id;
    });
    return {
        securities: updatedList
    };
}

let updateSecurity = (prevState, security) => {
    let updatedList = prevState.securities.map((i) => {
        if(i.id === security.id) {
            i = security;
        }
        return i;
    });
    return {
        securities: updatedList
    };
}

let updateSecurities = (prevState, partialSecurities) => {
    let updatedList = prevState.securities.map((security) => {
        let partialSecurity = _.find(partialSecurities, {'symbol': security.symbol});
        let newSecurity = _.assign(security, partialSecurity);
        if(partialSecurity) {
            newSecurity.status = {
                type: partialSecurity.cost ? 'Success' : 'Failed',
                message: partialSecurity.cost ? null : 'Could not update security'
            }
        }
        return newSecurity;
    });
    return {
        securities: updatedList
    };
}

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            securities: [
                {
                    id: guid(),
                    symbol: 'VUN.O',
                    cost: 0,
                    portPercentTarget: 25,
                    mktValue: 3825.00,
                    buyQty: 0
                },
                {
                    id: guid(),
                    symbol: 'VCN.TO',
                    cost: 0,
                    portPercentTarget: 25,
                    mktValue: 3753.94,
                    buyQty: 0
                },
                {
                    id: guid(),
                    symbol: 'VAB.TO',
                    cost: 0,
                    portPercentTarget: 20,
                    mktValue: 3052.66,
                    buyQty: 0
                },
                {
                    id: guid(),
                    symbol: 'VDU.TO',
                    cost: 0,
                    portPercentTarget: 20,
                    mktValue: 3050.96,
                    buyQty: 0
                },
                {
                    id: guid(),
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
                this.setState((prevState, props) => updateSecurities(prevState, resp));
            });
    }

    componentDidMount() {
        this.getSecurities();
    }

    handleRefreshButtonClick = () => {
        this.getSecurities();
    }

    handleAddButtonClick = () => {
        this.setState((prevState, props) => addSecurity(prevState, createSecurity()));
    }

    handleSecurityRemove = (security) => {
        this.setState((prevState, props) => removeSecurity(prevState, security));

        this.setState((prevState, props) => {
            if(prevState.securities.length === 0) {
                return addSecurity(prevState, createSecurity());
            }
        });
    }

    handleSecurityChange = (security) => {
        this.setState((prevState, props) => updateSecurity(prevState, security));
    }

    handleCashChange = (cash) => {
        this.setState({
            cash
        });
    }

    render() {
        const total = getTotalWithCash(this.state.securities, this.state.cash, 'mktValue');
        return(
            <div className="Portfolio">

                <div className="Portfolio-actions">
                    <button onClick={this.handleAddButtonClick}>Add Security</button>
                    <button onClick={this.handleRefreshButtonClick}>Refresh Quotes</button>
                </div>

                <SecurityGraphs/>
                <SecurityList
                    securities={this.state.securities}
                    onSecurityChange={this.handleSecurityChange}
                    onSecurityRemove={this.handleSecurityRemove}
                    cash={this.state.cash}
                    onCashChange={this.handleCashChange}
                    total={total}/>

                <br/>
                Portfolio todo:
                <ul>
                    <li>Add loader</li>
                    <li>Manage error from api</li>
                    <li>Handle on change</li>
                </ul>
            </div>
        )
    }
}

export default Portfolio;