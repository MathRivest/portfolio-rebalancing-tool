import React from 'react';

class BalancerCash extends React.Component {

    handleChanges = (e) => {
        let newValue = e.target.value;
        if(e.target.type === 'number') {
            newValue = parseFloat(newValue) || 0;
        }
        this.props.onCashChange({
            ...this.props.account,
            ...{
                cash: {
                    ...this.props.account.cash,
                    [e.target.name]: newValue
                }
            }
        });
    }

    render() {
        const cash = this.props.account.cash;
        const portPercent = this.props.portPercent;
        const newPortPercent = this.props.newPortPercent;

        return (
            <tr>
                <td className="DataTable-row-cell--left">
                    <div
                        className="DataTable-colorBlock"
                        style={{color: 'rgba(' + cash.displayColor  + ', 1)'}}></div>
                    Cash
                </td>
                <td>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        name="portPercentTarget"
                        value={cash.portPercentTarget}
                        style={{width: '4em'}}
                        onChange={this.handleChanges}/>
                </td>
                <td>
                    {portPercent}
                </td>
                <td>
                    {newPortPercent}
                </td>
            </tr>
        )
    }
}

export default BalancerCash;