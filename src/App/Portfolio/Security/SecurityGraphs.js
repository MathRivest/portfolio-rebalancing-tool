import React from 'react';
import _ from 'lodash';
import './SecurityGraphs.css';
import {Doughnut} from 'react-chartjs-2';

class SecurityGraphs extends React.Component {

    baseData = {
        labels: null,
        datasets: [
            {
                backgroundColor: null,
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(121, 88, 159, 1)',
                hoverBorderColor: '#ffffff',
                data: null
            }
        ]
    };

    baseOptions = {
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Portfolio Target'
        },
        legend: {
            display: false
        }
    };

    render() {
        this.baseData.labels = _.map(this.props.securities, 'symbol');
        this.baseData.datasets[0].data = _.map(this.props.securities, 'portPercentTarget');
        this.baseData.datasets[0].backgroundColor = _.map(this.props.securities, (i, k) => {
            let opacity = (k + 1) / this.props.securities.length;
            return 'rgba(121, 88, 159, ' + opacity + ')';
        });

        const portPercentTargetChartData = _.clone(this.baseData);
        const portPercentTargetChartOptions = _.clone(this.baseOptions);
        return(
            <div className="SecurityGraphs">
                <div className="SecurityGraphs-graph">
                    <Doughnut
                        data={portPercentTargetChartData}
                        options={portPercentTargetChartOptions}/>
                </div>
                <div className="SecurityGraphs-graph">
                    <Doughnut
                        data={portPercentTargetChartData}
                        options={portPercentTargetChartOptions}/>
                </div>
                <div className="SecurityGraphs-graph">
                    <Doughnut
                        data={portPercentTargetChartData}
                        options={portPercentTargetChartOptions}/>
                </div>
            </div>
        )
    }
}

export default SecurityGraphs;