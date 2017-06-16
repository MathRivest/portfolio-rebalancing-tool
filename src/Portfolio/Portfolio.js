import React, { Component } from 'react';
import _ from 'lodash';

import SecurityList from './SecurityList/SecurityList';
import SecurityGraphs from './SecurityGraphs/SecurityGraphs';

let findSecurityById = (securities, id) => {
    return _.find(securities, {'id': id});
}

let updateSecurities = (prevState, security) => {
    let i = _.findIndex(prevState.securities, findSecurityById(prevState.securities, security.id));
    prevState.securities[i] = security
    return prevState.securities;
}

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            securities: [
                {
                    id: 1,
                    symbol: 'VDU',
                    cost: 38.23,
                    mktValue: 2126.38,
                    portPercent: 19.47,
                    portPercentTarget: 25,
                    buyQty: 5,
                    portPercentNew: 25.02
                },
                {
                    id: 2,
                    symbol: 'VSX',
                    cost: 16.34,
                    mktValue: 1672.38,
                    portPercent: 9.70,
                    portPercentTarget: 15,
                    buyQty: 10,
                    portPercentNew: 16
                },
                {
                    id: 3,
                    symbol: 'VCN',
                    cost: 16.34,
                    mktValue: 13672.38,
                    portPercent: 19.70,
                    portPercentTarget: 55,
                    buyQty: 10,
                    portPercentNew: 16
                }
            ]
        }
    }

    onSecurityChange = (security) => {
        this.setState((prevState, props) => updateSecurities(prevState, security));
    }

    render() {
        return(
            <div className="Portfolio">
                <SecurityGraphs/>
                <SecurityList
                    securities={this.state.securities}
                    onSecurityChange={this.onSecurityChange}/>
                Portfolio todo:
                <ul>
                    <li>Add total row</li>
                    <li>Add add row</li>
                </ul>
            </div>
        )
    }
}

export default Portfolio;