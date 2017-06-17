import React from 'react';
import { computeTotalWithCash } from './SecurityHelper';

class TotalRow extends React.Component {
    render() {
        const portPercentTargetTotal = computeTotalWithCash(this.props.securities, this.props.cash, 'portPercentTarget');
        const mktValueTotal = computeTotalWithCash(this.props.securities, this.props.cash, 'mktValue');
        const portPercentTotal = computeTotalWithCash(this.props.securities, this.props.cash, 'portPercent');
        const portPercentNewTotal = computeTotalWithCash(this.props.securities, this.props.cash, 'portPercentNew');
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