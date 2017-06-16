import React, { Component } from 'react';
import _ from 'lodash';

import SecurityList from './SecurityList/SecurityList';
import SecurityGraphs from './SecurityGraphs/SecurityGraphs';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


let findSecurityById = (securities, id) => {
    return _.find(securities, {'id': id});
}

let updateSecurities = (prevState, security) => {
    let i = _.findIndex(prevState.securities, findSecurityById(prevState.securities, security.id));
    prevState.securities[i] = security
    return prevState.securities;
}

let createSecurity = () => {
    return {
        id: guid(),
        symbol: '',
        cost: 0,
        mktValue: 0,
        portPercent: 0,
        portPercentTarget: 0,
        buyQty: 0,
        portPercentNew: 0
    }
}

let addSecurity = (prevState, security) => {
    console.log([...prevState.securities, security]);
    prevState.securities.push(security);
    return prevState.securities;
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
                    mktValue: 2126.38,
                    portPercent: 19.47,
                    portPercentTarget: 25,
                    buyQty: 0,
                    portPercentNew: 25.02
                },
                {
                    id: guid(),
                    symbol: 'VSX',
                    cost: 16.34,
                    mktValue: 1672.38,
                    portPercent: 9.70,
                    portPercentTarget: 15,
                    buyQty: 0,
                    portPercentNew: 16
                },
                {
                    id: guid(),
                    symbol: 'VCN',
                    cost: 16.34,
                    mktValue: 13672.38,
                    portPercent: 19.70,
                    portPercentTarget: 55,
                    buyQty: 0,
                    portPercentNew: 16
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

    handleSecurityChange = (security) => {
        this.setState((prevState, props) => updateSecurities(prevState, security));
    }

    handleCashChange = (cash) => {
        this.setState({
            cash
        });
    }

    handleAddButtonClick = () => {
        let security = createSecurity();
        this.setState((prevState, props) => addSecurity(prevState, security));
    }

    render() {
        return(
            <div className="Portfolio">
                <SecurityGraphs/>
                <SecurityList
                    securities={this.state.securities}
                    onSecurityChange={this.handleSecurityChange}
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