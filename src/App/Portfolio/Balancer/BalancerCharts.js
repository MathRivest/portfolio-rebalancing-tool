import React from 'react';
import _ from 'lodash';

import SecurityHelpers from '../Security/SecurityHelpers';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';

class BalancerCharts extends React.Component {

    getFilteredSecurities = () => {
        return _.chain(this.props.accounts)
            .flatMap((n) => {
                return n.securities;
            })
            .orderBy('symbol')
            .filter('cost')
            .value();
    }

    newPortPercentData = () => {
        let data = [];
        const securities = this.getFilteredSecurities();
        const totalCash = SecurityHelpers.getTotalWithCash(
            securities,
            SecurityHelpers.getSumCash('mktValue', this.props.accounts),
            'mktValue'
        );
        const total = SecurityHelpers.getTotalWithCash(
                securities,
                totalCash,
                'mktValue',
                this.props.accounts
            );
        let price;
        let newPortPercent;

        data = _.map(securities, (o) => {
            price = SecurityHelpers.multiplyValues(o.buyQty, o.cost);
            newPortPercent = SecurityHelpers.getPercentOf(o.mktValue + price, total);
            return {
                name: o.symbol,
                value: newPortPercent,
                rgb: o.displayColor
            }
        });

        _.forEach(this.props.accounts, (account) => {
            let price = SecurityHelpers.getTotalofMultiplied(account.securities, 'cost', 'buyQty');
            let cashNewPortPercent = SecurityHelpers.getPercentOf(account.cash.mktValue - price, total);
            data.push({
                name: account.cash.symbol,
                value: cashNewPortPercent,
                rgb: account.cash.displayColor
            });
        });

        return data;
    }

    portPercentTargetData = () => {
        let data = [];
        let securities = _.uniqBy(this.getFilteredSecurities(), 'symbol');
        data = _.map(securities, (o) => {
            return {
                name: o.symbol,
                value: o.portPercentTarget,
                rgb: o.displayColor
            }
        });

        _.forEach(this.props.accounts, (account) => {
            data.push({
                name: account.cash.symbol,
                value: account.cash.portPercentTarget,
                rgb: account.cash.displayColor
            });
        });

        return data;
    }

    render() {
        const innerPieData = this.newPortPercentData();
        const outerPieData = this.portPercentTargetData();
        return(
            <div>
                <PieChart width={340} height={340}>
                    <Pie
                        data={innerPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        startAngle={450}
                        endAngle={90}
                        outerRadius={90}>
                        {innerPieData.map((o, i) => {
                            return <Cell key={i} fill={'rgba(' + o.rgb  + ', 1)'}/>
                        })}
                    </Pie>
                    <Pie
                        data={outerPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        startAngle={450}
                        endAngle={90}
                        innerRadius={100}
                        outerRadius={120}
                        label>
                        {outerPieData.map((o, i) => {
                            return <Cell key={i} fill={'rgba(' + o.rgb  + ', 0.8)'}/>
                        })}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </div>
        )
    }
}

export default BalancerCharts;