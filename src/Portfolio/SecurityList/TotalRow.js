import React from 'react';
import _ from 'lodash';

class TotalRow extends React.Component {
    sumList = (arr, start) => {
        let acc = start || 0;
        return _.reduce(arr, (sum, val) => {
            if(_.isNumber(val)) {
                return val + sum;
            } else {
                return sum;
            }
        }, acc);
    };

    computeTotalWithCash = (securities, cash, property) => {
        return this.sumList(_.map(securities, property), cash[property]);
    }

    render() {
        const portPercentTargetTotal = this.computeTotalWithCash(this.props.securities, this.props.cash, 'portPercentTarget');
        const mktValueTotal = this.computeTotalWithCash(this.props.securities, this.props.cash, 'mktValue');
        const portPercentTotal = this.computeTotalWithCash(this.props.securities, this.props.cash, 'portPercent');
        const portPercentNewTotal = this.computeTotalWithCash(this.props.securities, this.props.cash, 'portPercentNew');
        return(
            <tr className="SecurityList-row">
                <td className="SecurityList-row-cell--left">
                    Total
                </td>
                <td></td>
                <td>{portPercentTargetTotal}</td>
                <td>{mktValueTotal}</td>
                <td>{portPercentTotal}</td>
                <td></td>
                <td>{portPercentNewTotal}</td>
                <td></td>
            </tr>
        )
    }
}

export default TotalRow;