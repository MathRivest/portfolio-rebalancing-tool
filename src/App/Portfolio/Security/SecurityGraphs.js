import React from 'react';
import _ from 'lodash';
import './SecurityGraphs.css';
import SecurityHelpers from './SecurityHelpers';
import { Doughnut } from 'react-chartjs-2';

class SecurityGraphs extends React.Component {
    assets = [];
    graphConfig = () => {
        const labels = _.map(this.assets, 'symbol');
        const data = _.map(this.assets, 'portPercentTarget');
        const backgroundColor = (modifier = 1) => {
            return _.map(this.assets, (asset) => {
                return 'rgba(' + asset.displayColor  + ', '+ modifier +')';
            });
        };
        return  {
            baseData: {
                labels: labels,
                datasets: [
                    {
                        label: 'Target',
                        backgroundColor: backgroundColor('0.7'),
                        borderWidth: 2,
                        hoverBackgroundColor: backgroundColor(),
                        hoverBorderColor: '#ffffff',
                        data: data
                    },
                    {
                        label: '',
                        backgroundColor: backgroundColor('0.9'),
                        borderWidth: 2,
                        hoverBackgroundColor: backgroundColor(),
                        hoverBorderColor: '#ffffff',
                        data: data
                    }
                ]
            },
            baseOptions: {
                maintainAspectRatio: false,
                cutoutPercentage: 40,
                title: {
                    display: true,
                    fontSize: 14,
                    fontColor: '#596981',
                    fontStyle: '400',
                    padding: 18
                },
                legend: {
                    display: false
                }
            }
        }
    }

    shouldRender = () => {
        let hasPercentTotal = SecurityHelpers.getTotalWithCash(this.props.securities, this.props.cash, 'portPercentTarget') > 0,
            hasTotal = this.props.total > 0;
        return hasPercentTotal || hasTotal;
    }

    render() {

        if(!this.shouldRender()) {
            return false
        }

        this.assets = [...this.props.securities, this.props.cash];

        // Current Graph
        const portPercentChartData = this.graphConfig().baseData;
        const portPercentChartOptions = this.graphConfig().baseOptions;
        portPercentChartOptions.title.text = 'Target(out) vs Current(in) %';
        portPercentChartData.datasets[1].label = 'Current';
        portPercentChartData.datasets[1].data = _.map(this.assets, (asset) => {
            return SecurityHelpers.getPercentOf(asset.mktValue, this.props.total);
        });

        // New Graph
        const portPercentNewChartData = this.graphConfig().baseData;
        const portPercentNewChartOptions = this.graphConfig().baseOptions;
        portPercentNewChartOptions.title.text = 'Target(out) vs New(in) %'
        portPercentNewChartData.datasets[1].label = 'New';
        portPercentNewChartData.datasets[1].data = _.map(this.props.securities, (security) => {
            const price = SecurityHelpers.multiplyValues(security.cost, security.buyQty);
            return SecurityHelpers.getPercentOf(security.mktValue + price, this.props.total);
        });
        const totalPrice = SecurityHelpers.getTotalofMultiplied(this.props.securities, 'cost', 'buyQty');
        const cashLeft = SecurityHelpers.getPercentOf(this.props.cash.mktValue - totalPrice, this.props.total);
        portPercentNewChartData.datasets[1].data.push(cashLeft);
        return(
            <div className="SecurityGraphs">
                <div className="SecurityGraphs-graph">
                    <Doughnut
                        data={portPercentChartData}
                        options={portPercentChartOptions}/>
                </div>
                <div className="SecurityGraphs-graph">
                    <Doughnut
                        data={portPercentNewChartData}
                        options={portPercentNewChartOptions}/>
                </div>
            </div>
        )
    }
}

export default SecurityGraphs;