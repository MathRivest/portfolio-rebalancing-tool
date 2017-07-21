import React from 'react';
import SecurityHelpers from './SecurityHelpers';
import { Format } from '../../Components';

class CashRow extends React.Component {

    handleChanges = (e) => {
        let newValue = e.target.value;
        if(e.target.type === 'number') {
            newValue = parseFloat(newValue) || '';
        }
        this.props.onCashChange({
            ...this.props.cash,
            [e.target.name]: newValue
        });
    }

    getPortPercentNew = () => {
        let totalPrice = SecurityHelpers.getTotalofMultiplied(this.props.securities, 'cost', 'buyQty');
        return SecurityHelpers.getPercentOf(this.props.cash.mktValue - totalPrice, this.props.total);
    }

    render() {
        const cash = this.props.cash;
        const cashPortPercent = SecurityHelpers.getPercentOf(this.props.cash.mktValue, this.props.total);
        const priceTotal = SecurityHelpers.getTotalofMultiplied(this.props.securities, 'cost', 'buyQty');
        const cashPortPercentNew = this.getPortPercentNew();

        return(
            <tr className="DataTable-row">
                <td className="DataTable-row-cell--left">
                    <div
                        className="DataTable-colorBlock"
                        style={{color: cash.displayColor}}></div>
                    {cash.symbol}
                </td>
                <td></td>
                <td>
                    <input
                        type="number"
                        name="mktValue"
                        value={cash.mktValue}
                        onChange={this.handleChanges}/>
                </td>
                <td>{cashPortPercent}</td>
                <td></td>
                <td><Format format="financial" value={priceTotal}/></td>
                <td>{cashPortPercentNew}</td>
                <td></td>
            </tr>
        )
    }
}

export default CashRow;