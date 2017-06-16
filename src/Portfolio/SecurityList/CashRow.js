import React, { Component } from 'react';

class CashRow extends React.Component {

    handleChanges = (e) => {
        this.props.onCashChange({
            ...this.props.cash,
            [e.target.name]: e.target.value
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
                <td>{cash.portPercent}</td>
                <td></td>
                <td>{cash.portPercentNew}</td>
            </tr>
        )
    }
}

export default CashRow;