import React from 'react';

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

    render() {
        const cash = this.props.cash;
        return(
            <tr className="SecurityList-row">
                <td className="SecurityList-row-cell--left">
                    {cash.symbol}
                </td>
                <td></td>
                <td>
                    <input
                        type="number"
                        name="portPercentTarget"
                        value={cash.portPercentTarget}
                        onChange={this.handleChanges}/>
                </td>
                <td>
                    <input
                        type="number"
                        name="mktValue"
                        value={cash.mktValue}
                        onChange={this.handleChanges}/>
                </td>
                <td>Compute me</td>
                <td></td>
                <td>{cash.portPercentNew}</td>
                <td></td>
            </tr>
        )
    }
}

export default CashRow;