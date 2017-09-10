import React from 'react';
import _ from 'lodash';

import './Balancer.css';
import BalancerHeader from './BalancerHeader';
import BalancerSecurity from './BalancerSecurity';
import BalancerCash from './BalancerCash';
import BalancerCharts from './BalancerCharts';

import AccountHelpers from '../Accounts/AccountHelpers';
import SecurityHelpers from '../Security/SecurityHelpers';

import { Button, Card } from '../../Components';


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
            newSumOfPortPercent;

        return securities.map((security) => {
            sumOfSecurityMktValue = this.getSumOfSecurity(security.symbol, 'mktValue');
            sumOfPortPercent = SecurityHelpers.getPercentOf(sumOfSecurityMktValue, total);
            price = SecurityHelpers.multiplyValues(
                security.cost,
                this.getSumOfSecurity(security.symbol, 'buyQty')
            );
            newSumOfPortPercent = SecurityHelpers.getPercentOf(
                this.getSumOfSecurity(security.symbol, 'mktValue') + price,
                total
            );

            return (
                <BalancerSecurity
                    key={security.id}
                    security={security}
                    onSecurityChange={this.handleSecurityChange}
                    portPercent={sumOfPortPercent}
                    newPortPercent={newSumOfPortPercent}/>
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

    getAccountBySecurityId = (accounts, id) => {
        return _.find(this.props.accounts, _.flow(
            _.property('securities'),
            _.partialRight(_.some, { id: id })
        ));
    }

    balanceAccounts = () => {
        const accounts = [...this.props.accounts];
        const allSecurities = _.orderBy(this.getAllSecurities(), ['cost'], ['desc']);

        const total = this.getSumTotal();

        let totalPriceInAccount,
            priceSumOfSecurity,
            newSumOfPortPercent,
            sameSecurities,
            symbolPortPercentTarget,
            itemAccount,
            moneyLeftInAccount;

        _.forEach(allSecurities, (i) => {
            i.buyQty = 0;
        });

        const updateValues = (item) => {
            itemAccount = this.getAccountBySecurityId(accounts, item.id);
            priceSumOfSecurity = SecurityHelpers.multiplyValues(
                item.cost,
                this.getSumOfSecurity(item.symbol, 'buyQty')
            );
            newSumOfPortPercent = SecurityHelpers.getPercentOf(
                this.getSumOfSecurity(item.symbol, 'mktValue') + priceSumOfSecurity,
                total
            );
            totalPriceInAccount = SecurityHelpers.getTotalofMultiplied(itemAccount.securities, 'cost', 'buyQty');
            moneyLeftInAccount = itemAccount.cash.mktValue - totalPriceInAccount;
        }

        const distribute = (item) => {
            _.forEach(sameSecurities, (j) => {
                updateValues(j);
                // let newPrice = SecurityHelpers.multiplyValues(
                //     j.cost,
                //     j.buyQty
                // );
                // let newTarget = SecurityHelpers.getPercentOf(
                //     j.mktValue,
                //     newPrice
                // );
                // && newTarget < symbolPortPercentTarget.portPercentTarget
                if(moneyLeftInAccount >= j.cost) {
                    j.buyQty++;
                }
                updateValues(j);
            });
            updateValues(item);
        }

        // Balance portfolio
        _.forEach(allSecurities, (i) => {
            sameSecurities = _.filter(allSecurities, {'symbol': i.symbol});
            symbolPortPercentTarget = _.find(sameSecurities, (o) => {
                return o.portPercentTarget > 0;
            });
            if(symbolPortPercentTarget) {
                updateValues(i);
                while((newSumOfPortPercent < symbolPortPercentTarget.portPercentTarget) && (moneyLeftInAccount >= i.cost)) {
                    distribute(i);
                }
            }
        });

        let updatedAccounts = accounts;

        return updatedAccounts
    }

    handleAccountsBalanceButton = () => {
        const balancedAccounts = this.balanceAccounts();
        this.props.onAccountsChange(balancedAccounts);
    }

    handleAccountsClearButton = () => {
        const clearedAccounts = [...this.props.accounts];
        _.forEach(this.getAllSecurities(), (i) => {
            i.buyQty = 0;
        });
        this.props.onAccountsChange(clearedAccounts);
    }

    render() {
        const list = this.makeList();
        const cashRow = this.makeCashRow();
        const totalRow = this.makeTotalRow();

        const canBalance = this.getPortPercentTargetTotal() === 100;
        return (
            <div className="Balancer">
                <div className="Balancer-header">
                    <h3>Targets</h3>
                    <ul className="Balancer-actions">
                        <li>
                            <Button
                                variant="primary"
                                iconName="donut_large"
                                onClick={this.handleAccountsBalanceButton}
                                disabled={!canBalance}>
                                Balance
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="primary"
                                iconName="undo"
                                onClick={this.handleAccountsClearButton}>
                                Clear Buy
                            </Button>
                        </li>
                    </ul>
                </div>

                <Card>
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

                    <p>Set your target for each security here, the total sum must be 100% before you can balance.</p>
                </Card>

                <div className="Balancer-header">
                    <h3>Balanced vs Target (%)</h3>
                </div>
                <Card>
                    <BalancerCharts className="Balancer-chart" accounts={this.props.accounts}/>
                </Card>
            </div>
        )
    }
}

export default Balancer;