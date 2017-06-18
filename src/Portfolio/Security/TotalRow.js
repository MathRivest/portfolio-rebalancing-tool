import React from 'react';
import { getTotalWithCash, getResultTotal } from './SecurityHelper';

let TargetIndicator = (props) => {
    let styleClass = 'TargetIndicator--neutral';
    if(props.val > props.maxVal) {
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
        const portPercentNewTotal = getTotalWithCash(this.props.securities, this.props.cash, 'portPercentNew');

        const priceTotal = getResultTotal(this.props.securities, 'cost', 'buyQty')
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
                <td>
                    <TargetIndicator
                        val={priceTotal}
                        maxVal={this.props.cash.mktValue}>
                        {priceTotal}
                    </TargetIndicator>
                </td>
                <td></td>
                <td></td>
            </tr>
        )
    }
}

export default TotalRow;