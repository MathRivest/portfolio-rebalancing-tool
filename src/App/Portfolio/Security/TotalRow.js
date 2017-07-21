import React from 'react';
import SecurityHelpers from './SecurityHelpers';
import { Format, TargetIndicator } from '../../Components';

class TotalRow extends React.Component {
    render() {
        const mktValueTotal = SecurityHelpers.getTotalWithCash(this.props.securities, this.props.cash.mktValue, 'mktValue');
        const priceTotal = SecurityHelpers.getTotalofMultiplied(this.props.securities, 'cost', 'buyQty');
        const cashLeft = this.props.cash.mktValue - priceTotal;
        return(
            <tr className="DataTable-row">
                <td className="DataTable-row-cell--left">
                    Total
                </td>
                <td></td>
                <td><Format format="financial" value={mktValueTotal}/></td>
                <td></td>
                <td></td>
                <td>
                    <TargetIndicator val={cashLeft} minVal={0}>
                        <Format format="financial" value={cashLeft}/>
                    </TargetIndicator>
                </td>
                <td></td>
                <td></td>
            </tr>
        )
    }
}

export default TotalRow;