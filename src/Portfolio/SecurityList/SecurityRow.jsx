import React, { Component } from 'react';

class SecurityRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleChanges = this.handleChanges.bind(this);
    }

    handleChanges = (e) => {
        this.props.onSecurityChange({
            ...this.props.security,
            [e.target.name]: parseFloat(e.target.value)
        });
    }

    render() {
        const security = this.props.security;
        return(
            <tr className="SecurityRow">
                <td className="SecurityRow-cell">{security.symbol}</td>
                <td className="SecurityRow-cell">{security.cost}</td>
                <td className="SecurityRow-cell">
                    <input
                        type="text"
                        name="mktValue"
                        value={this.props.security.mktValue}
                        onChange={this.handleChanges}/>
                </td>
                <td className="SecurityRow-cell">{security.portPercent}</td>
                <td className="SecurityRow-cell">
                    <input
                        type="text"
                        name="portPercentTarget"
                        value={this.props.security.portPercentTarget}
                        onChange={this.handleChanges}/>
                </td>
                <td className="SecurityRow-cell">
                    <input
                        type="text"
                        name="buyQty"
                        value={this.props.security.buyQty}
                        onChange={this.handleChanges}/>
                </td>
                <td className="SecurityRow-cell">{security.portPercentNew}</td>
            </tr>
        )
    }
}

export default SecurityRow;