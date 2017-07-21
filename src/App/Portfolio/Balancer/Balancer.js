import React from 'react';
import _ from 'lodash';

import './Balancer.css';
import BalancerHeader from './BalancerHeader';
import BalancerSecurity from './BalancerSecurity';
import BalancerCash from './BalancerCash';

import AccountHelpers from '../Accounts/AccountHelpers';
import SecurityHelpers from '../Security/SecurityHelpers';


import { TargetIndicator } from '../../Components';

class Balancer extends React.Component {
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
        return _.reduce(this.props.accounts, (sum, account) => {
            return sum + account.cash[prop];
        }, 0);
    }

    getSumOfSecurity = (symbol, prop) => {
        return  _.reduce(this.props.accounts, (sum, account) => {
            let security = _.find(account.securities, {'symbol': symbol});
            return security ? sum + security[prop] : sum;
        }, 0);
    }

    getSumTotal = () => {
        return SecurityHelpers.getTotalWithCash(
            this.getAllSecurities(),
            this.getSumCash('mktValue'),
            'mktValue'
        );
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
            total = this.getSumTotal(),
            sumOfSecurityMktValue,
            sumOfPortPercent,
            price,
            newPortPercent;

        return securities.map((security) => {
            sumOfSecurityMktValue = this.getSumOfSecurity(security.symbol, 'mktValue');
            sumOfPortPercent = SecurityHelpers.getPercentOf(sumOfSecurityMktValue, total);
            price = SecurityHelpers.multiplyValues(
                security.cost,
                this.getSumOfSecurity(security.symbol, 'buyQty')
            );
            newPortPercent = SecurityHelpers.getPercentOf(
                this.getSumOfSecurity(security.symbol, 'mktValue') + price,
                total
            );

            return (
                <BalancerSecurity
                    key={security.id}
                    security={security}
                    onSecurityChange={this.handleSecurityChange}
                    portPercent={sumOfPortPercent}
                    newPortPercent={newPortPercent}/>
            )
        });
    }

    makeCashRow = () => {
        if(this.props.accounts.length === 0) {
            return null;
        }

        const account = _.head(this.props.accounts);

        const total = this.getSumTotal();
        const sumOfPortPercent = SecurityHelpers.getPercentOf(this.getSumCash('mktValue'), total);

        const totalPrice = SecurityHelpers.getTotalofMultiplied(this.getAllSecurities(), 'cost', 'buyQty');
        const newSumPortPercent = SecurityHelpers.getPercentOf(this.getSumCash('mktValue') - totalPrice, total);

        return (
            <BalancerCash
                account={account}
                onCashChange={this.props.onAccountChange}
                portPercent={sumOfPortPercent}
                newPortPercent={newSumPortPercent}/>
        );
    }

    getPortPercentTargetTotal = () => {
        return SecurityHelpers.getTotalWithCash(
            this.getAllFilteredSecurities(),
            this.getSumCash('portPercentTarget'),
            'portPercentTarget'
        );
    }

    makeTotalRow = () => {
        const portPercentTargetTotal = this.getPortPercentTargetTotal();
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
        const cashRow = this.makeCashRow();
        const totalRow = this.makeTotalRow();
        return (
            <div className="Balancer">
                <table className="DataTable">
                    <thead>
                        <BalancerHeader/>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                    <tfoot>
                        {cashRow}
                        {totalRow}
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default Balancer;