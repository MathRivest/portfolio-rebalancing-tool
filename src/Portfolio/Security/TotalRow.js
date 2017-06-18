import React from 'react';

// Components
import { Format } from '../../Components';

// Helpers
import { getTotalWithCash, getTotalofMultiplied } from './SecurityHelper';

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
        const portPercentTargetTotal = getTotalWithCash(this.props.securities, this.props.cash, 'portPercentTarget');
        const mktValueTotal = getTotalWithCash(this.props.securities, this.props.cash, 'mktValue');
        const portPercentTotal = getTotalWithCash(this.props.securities, this.props.cash, 'portPercent');
        const priceTotal = getTotalofMultiplied(this.props.securities, 'cost', 'buyQty');
        const cashLeft = this.props.cash.mktValue - priceTotal;
        return(
            <tr className="SecurityList-row">
                <td className="SecurityList-row-cell--left">
                    Total
                </td>
                <td></td>
                <td>{portPercentTargetTotal}</td>
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