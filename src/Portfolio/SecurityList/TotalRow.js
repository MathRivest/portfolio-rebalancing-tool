import React from 'react';
import _ from 'lodash';

class TotalRow extends React.Component {
    sumList = (arr, start) => {
        let acc = start || 0;
        return _.reduce(arr, (sum, val) => {
            if(_.isNumber(val)) {
                return val + sum;
            }
        }, acc);
    };

    computePortPercentTarget = () => {
        let securitiesPortPercentTarget = _.map(this.props.securities, 'portPercentTarget');
        let start = this.props.cash.portPercentTarget;
        return this.sumList(securitiesPortPercentTarget, start);
    }

    computeMktVal = () => {
        let securitiesMktValues = _.map(this.props.securities, 'mktValue');
        let start = this.props.cash.mktValue;
        return this.sumList(securitiesMktValues, start);
    }

    render() {
        const totalTarget = this.computePortPercentTarget();
        const totalMktVal = this.computeMktVal();
        return(
            <tr className="SecurityList-row">
                <td className="SecurityList-row-cell--left">
                    Total
                </td>
                <td></td>
                <td>{totalTarget}</td>
                <td>{totalMktVal}</td>
                <td></td>
                <td>Compute new</td>
            </tr>
        )
    }
}

export default TotalRow;