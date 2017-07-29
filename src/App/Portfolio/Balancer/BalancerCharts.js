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

    portPercentData = () => {
        let securities = this.getFilteredSecurities();
        let total = SecurityHelpers.getTotalWithCash(
                this.getFilteredSecurities(),
                SecurityHelpers.getSumCash('mktValue'),
                'mktValue',
                this.props.accounts
            );
        let sumOfSecurityMktValue;
        let sumOfPortPercent;

        return _.map(securities, (o) => {
            sumOfSecurityMktValue = SecurityHelpers.getSumOfSecurity(o.symbol, 'mktValue', this.props.accounts);
            sumOfPortPercent = SecurityHelpers.getPercentOf(sumOfSecurityMktValue, total);
            return {
                name: o.symbol,
                value: sumOfPortPercent,
                rgb: o.displayColor
            }
        });
    }

    newPortPercentData = () => {
        const securities = this.getFilteredSecurities();
        const totalCash = SecurityHelpers.getTotalWithCash(
            securities,
            SecurityHelpers.getSumCash('mktValue', this.props.accounts),
            'mktValue'
        );
        const total = SecurityHelpers.getTotalWithCash(
                this.getFilteredSecurities(),
                totalCash,
                'mktValue',
                this.props.accounts
            );
        let price;
        let newSumOfPortPercent;

        return _.map(securities, (o) => {

            price = SecurityHelpers.multiplyValues(
                o.cost,
                SecurityHelpers.getSumOfSecurity(o.symbol, 'buyQty', this.props.accounts)
            );
            newSumOfPortPercent = SecurityHelpers.getPercentOf(
                SecurityHelpers.getSumOfSecurity(
                    o.symbol,
                    'mktValue',
                    this.props.accounts
                ) + price,
                total,
            );
            return {
                name: o.symbol,
                value: newSumOfPortPercent,
                rgb: o.displayColor
            }
        });
    }

    portPercentTargetData = () => {
        let securities = this.getFilteredSecurities();
        return _.map(securities, (o) => {
            return {
                name: o.symbol,
                value: o.portPercentTarget,
                rgb: o.displayColor
            }
        });
    }

    render() {

        const innerPieData = this.newPortPercentData();
        const outerPieData = this.portPercentTargetData();
        return(

            <PieChart width={320} height={320}>
                <Pie
                    data={innerPieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    startAngle={450}
                    endAngle={90}
                    outerRadius={50}
                    fill="#8884d8">
                    {innerPieData.map((o, i) => {
                        return <Cell key={i} fill={'rgba(' + o.rgb  + ', 1)'}/>
                    })}
                </Pie>
                <Pie
                    data={outerPieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    startAngle={450}
                    endAngle={90}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82ca9d"
                    label>
                    {outerPieData.map((o, i) => {
                        return <Cell key={i} fill={'rgba(' + o.rgb  + ', 0.8)'}/>
                    })}
                </Pie>
                <Tooltip/>
            </PieChart>
        )
    }
}

export default BalancerCharts;