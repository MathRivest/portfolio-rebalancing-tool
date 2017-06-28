import React from 'react';
import SecurityHelpers from './SecurityHelpers';
import { Format } from '../../Components';

let TargetIndicator = (props) => {
    let styleClass = 'TargetIndicator--neutral';
    if(props.val > props.maxVal || props.val < props.minVal) {
        styleClass = 'TargetIndicator--danger'
    }
    return (
        <span className={'TargetIndicator ' + styleClass}>
            {props.children}
        </span>
    )
}

class TotalRow extends React.Component {
    render() {
        const portPercentTargetTotal = SecurityHelpers.getTotalWithCash(this.props.securities, this.props.cash, 'portPercentTarget');
        const mktValueTotal = SecurityHelpers.getTotalWithCash(this.props.securities, this.props.cash, 'mktValue');
        const portPercentTotal = SecurityHelpers.getTotalWithCash(this.props.securities, this.props.cash, 'portPercent');
        const priceTotal = SecurityHelpers.getTotalofMultiplied(this.props.securities, 'cost', 'buyQty');
        const cashLeft = this.props.cash.mktValue - priceTotal;
        return(
            <tr className="SecurityList-row">
                <td className="SecurityList-row-cell--left">
                    Total
                </td>
                <td></td>
                <td>
                    <TargetIndicator val={portPercentTargetTotal} minVal={100}  maxVal={100}>
                        {portPercentTargetTotal}
                    </TargetIndicator>
                </td>
                <td><Format format="financial" value={mktValueTotal}/></td>
                <td>{portPercentTotal}</td>
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