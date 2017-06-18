import React from 'react';
import _ from 'lodash';

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

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            securities: [
                {
                    id: guid(),
                    symbol: 'VDU',
                    cost: 38.23,
                    portPercentTarget: 25,
                    mktValue: 2126.38,
                    buyQty: 0
                },
                {
                    id: guid(),
                    symbol: 'VSX',
                    cost: 16.34,
                    portPercentTarget: 15,
                    mktValue: 1672.38,
                    buyQty: 0
                },
                {
                    id: guid(),
                    symbol: 'VCN',
                    cost: 16.34,
                    portPercentTarget: 45,
                    mktValue: 13672.38,
                    buyQty: 0
                }
            ],
            cash: {
                symbol: 'Cash',
                mktValue: 20000,
                portPercentTarget: 10
            }
        }
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
                    <button onClick={this.handleAddButtonClick}>Add</button>
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
                    <li>Add price row</li>
                    <li>Compute new % based on buy qty</li>
                    <li>Compute new % total</li>
                </ul>
            </div>
        )
    }
}

export default Portfolio;