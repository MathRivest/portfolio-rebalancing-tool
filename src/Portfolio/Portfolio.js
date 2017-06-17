import React from 'react';
import _ from 'lodash';

import SecurityList from './Security/SecurityList';
import SecurityGraphs from './Security/SecurityGraphs';

import { guid } from './PortfolioHelper';

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
                    portPercent: 10,
                    buyQty: 0,
                    portPercentNew: 25
                },
                {
                    id: guid(),
                    symbol: 'VSX',
                    cost: 16.34,
                    portPercentTarget: 15,
                    mktValue: 1672.38,
                    portPercent: 5,
                    buyQty: 0,
                    portPercentNew: 15
                },
                {
                    id: guid(),
                    symbol: 'VCN',
                    cost: 16.34,
                    portPercentTarget: 55,
                    mktValue: 13672.38,
                    portPercent: 20,
                    buyQty: 0,
                    portPercentNew: 15
                }
            ],
            cash: {
                symbol: 'Cash',
                mktValue: 20000,
                portPercent: 20,
                portPercentTarget: 0,
                portPercentNew: 5
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
        return(
            <div className="Portfolio">
                <SecurityGraphs/>
                <SecurityList
                    securities={this.state.securities}
                    onSecurityChange={this.handleSecurityChange}
                    onSecurityRemove={this.handleSecurityRemove}
                    cash={this.state.cash}
                    onCashChange={this.handleCashChange}/>

                <div>
                    <button onClick={this.handleAddButtonClick}>Add</button>
                </div>
                <br/>
                Portfolio todo:
                <ul>
                    <li>Add total row</li>
                    <li>Compute current percent</li>
                    <li>Compute new %</li>
                    <li>Delete row</li>
                </ul>
            </div>
        )
    }
}

export default Portfolio;