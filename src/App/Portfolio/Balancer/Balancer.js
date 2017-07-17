import React from 'react';
import _ from 'lodash';

import './Balancer.css';
import BalancerSecurity from './BalancerSecurity';

import SecurityHelpers from '../Security/SecurityHelpers';
import AccountHelpers from '../Accounts/AccountHelpers';


import { TargetIndicator } from '../../Components';

class Balancer extends React.Component {
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

    getSumOfSecurity = (symbol, prop) => {
        return  _.reduce(this.props.accounts, (sum, account) => {
            let security = _.find(account.securities, {'symbol': symbol});
            return security ? sum + security[prop] : sum;
        }, 0);
    }

    getSumTotal = () => {
        return SecurityHelpers.getTotalWithCash(this.getAllSecurities(), this.getSumCash('portPercentTarget'), 'mktValue');
    }

    getPortPercentTargetTotal = () => {
        return SecurityHelpers.getTotalWithCash(this.getAllFilteredSecurities(), this.getSumCash('portPercentTarget'), 'portPercentTarget');
    }

    makeList = () => {
        let securities = this.getAllFilteredSecurities(),
            total = this.getSumTotal();

        return securities.map((security) => {
            const sumOfSecurityMktValue = this.getSumOfSecurity(security.symbol, 'mktValue');
            const sumOfPortPercent = SecurityHelpers.getPercentOf(sumOfSecurityMktValue, total);
            return (
                <BalancerSecurity
                    key={security.id}
                    security={security}
                    onSecurityChange={this.handleSecurityChange}
                    sumOfPortPercent={sumOfPortPercent}/>
            )
        }
        );
    }

    makeFooter = () => {

        const portPercentTargetTotal = this.getPortPercentTargetTotal();

        return (
            <tr>
                <td className="DataTable-row-cell--left">Total</td>
                <td></td>
                <td></td>
                <td>
                    <TargetIndicator val={portPercentTargetTotal} minVal={100}  maxVal={100}>
                        {portPercentTargetTotal}
                    </TargetIndicator>
                </td>
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
                                Current (%)
                            </th>
                            <th>
                                New (%)
                            </th>
                            <th>
                                Target (%)
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