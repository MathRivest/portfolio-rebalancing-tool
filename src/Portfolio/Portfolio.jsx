import React, { Component } from 'react';
import _ from 'lodash';

import SecurityList from './SecurityList/SecurityList';
import SecurityGraphs from './SecurityGraphs/SecurityGraphs';

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

        this.onSecurityChange = this.onSecurityChange.bind(this);
        this.updateSecurities = this.updateSecurities.bind(this);
        this.findSecurityById = this.findSecurityById.bind(this);
    }

    onSecurityChange(security) {
        this.setState({
            securities: this.updateSecurities(security)
        });
    }

    updateSecurities(security) {
        let i = _.findIndex(this.state.securities, this.findSecurityById(security.id));
        this.state.securities[i] = security
        return this.state.securities;
    }

    findSecurityById(id) {
        return _.find(this.state.securities, {'id': id});
    }

    render() {
        return(
            <div className="Portfolio">
                Portfolio
                <SecurityGraphs/>
                <SecurityList
                    securities={this.state.securities}
                    onSecurityChange={this.onSecurityChange}/>
                {JSON.stringify(this.props.securities)}
            </div>
        )
    }
}

export default Portfolio;