import React from 'react';

class SecurityRow extends React.Component {
    handleChanges = (e) => {
        let newValue = e.target.value;
        if(e.target.type === 'number') {
            newValue = parseFloat(newValue) || '';
        }
        this.props.onSecurityChange({
            ...this.props.security,
            [e.target.name]: newValue
        });
    }

    handleRemove = (e) => {
        this.props.onSecurityRemove(this.props.security);
    }

    render() {
        const security = this.props.security;
        return(
            <tr className="SecurityList-row">
                <td>
                    <input
                        type="text"
                        name="symbol"
                        value={security.symbol}
                        onChange={this.handleChanges}/>
                </td>
                <td>{security.cost}</td>
                <td>
                    <input
                        type="number"
                        name="portPercentTarget"
                        value={security.portPercentTarget}
                        onChange={this.handleChanges}/>
                </td>
                <td>
                    <input
                        type="number"
                        name="mktValue"
                        value={security.mktValue}
                        onChange={this.handleChanges}/>
                </td>
                <td>Compute me</td>
                <td>
                    <input
                        type="number"
                        name="buyQty"
                        value={security.buyQty}
                        onChange={this.handleChanges}/>
                </td>
                <td>{security.portPercentNew}</td>
                <td><button onClick={this.handleRemove}>Remove</button></td>
            </tr>
        )
    }
}

export default SecurityRow;