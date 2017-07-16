import React from 'react';
import _ from 'lodash';

import './Balancer.css';
import BalancerSecurity from './BalancerSecurity';

import SecurityHelpers from '../Security/SecurityHelpers';
import AccountHelpers from '../Accounts/AccountHelpers';


import { TargetIndicator } from '../../Components';

class Balancer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            securities: []
        }
    }

    getAllSecurities = () => {
        return _.chain(this.props.accounts)
            .flatMap((n) => {
                return n.securities;
            })
            .orderBy('symbol')
            .filter('cost')
            .value();
    }

    getAllFilteredSecurities = () => {
        return _.uniqBy(this.getAllSecurities(), 'symbol');
    }

    getSumCash = (prop) => {
        return  _.reduce(this.props.accounts, (sum, account) => {
            return sum + account.cash[prop]
        }, 0);
    }

    getSumTotal = () => {
        const totalCash = this.getSumCash('portPercentTarget');
        return SecurityHelpers.getTotalWithCash(this.getAllSecurities(), totalCash, 'mktValue');
    }

    getPortPercentTargetTotal = () => {
        const totalCash = this.getSumCash('portPercentTarget');
        return SecurityHelpers.getTotalWithCash(this.getAllFilteredSecurities(), totalCash, 'portPercentTarget');
    }

    handleSecurityChange = (security) => {
        _.forEach(this.props.accounts, (account) => {
            if(_.find(account.securities, {'id': security.id})) {
                this.props.onAccountChange({
                    ...account,
                    ...AccountHelpers.updateSecurity(account, security)
                });
            }
        });
    }

    makeList = () => {
        let securities = this.getAllFilteredSecurities(),
            total = this.getSumTotal();
        return securities.map((security) =>
            <BalancerSecurity
                key={security.id}
                security={security}
                onSecurityChange={this.handleSecurityChange}
                total={total}/>
        );
    }

    makeFooter = () => {

        const portPercentTargetTotal = this.getPortPercentTargetTotal();
        console.log(this.getSumTotal());

        return (
            <tr>
                <td className="DataTable-row-cell--left">Total</td>
                <td>
                    <TargetIndicator val={portPercentTargetTotal} minVal={100}  maxVal={100}>
                        {portPercentTargetTotal}
                    </TargetIndicator>
                </td>
                <td></td>
                <td></td>
            </tr>
        )
    }

    render() {
        const list = this.makeList();
        const footer = this.makeFooter();
        return (
            <div className="Balancer">
                <table className="DataTable">
                    <thead>
                        <tr>
                            <th className="DataTable-row-cell--left">
                                Symbol
                            </th>
                            <th>
                                Target (%)
                            </th>
                            <th>
                                Current (%)
                            </th>
                            <th>
                                New (%)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                    <tfoot>
                        {footer}
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default Balancer;