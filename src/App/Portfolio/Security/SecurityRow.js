import React from 'react';
import SecurityHelpers from './SecurityHelpers';
import { Format, Icon, Button } from '../../Components';

class SecurityRow extends React.Component {
    handleChanges = e => {
        let newValue = e.target.value;
        if (e.target.type === 'number') {
            newValue = parseFloat(newValue) || 0;
        }
        this.props.onSecurityChange({
            ...this.props.security,
            [e.target.name]: newValue
        });
    };

    handleNameChange = e => {
        this.props.onSecurityNameChange({
            ...this.props.security,
            [e.target.name]: e.target.value
        });
    };

    handleRemove = e => {
        this.props.onSecurityRemove(this.props.security);
    };

    getPrice = () => {
        return SecurityHelpers.multiplyValues(this.props.security.cost, this.props.security.buyQty);
    };

    getPortPercentNew = () => {
        let price = this.getPrice();
        return SecurityHelpers.getPercentOf(this.props.security.mktValue + price, this.props.total);
    };

    getSecurityStatus = () => {
        const security = this.props.security;
        const status = security.status;
        if (status && status.type === 'Failed') {
            return (
                <span className="u-vertical-middle u-pointer" data-title={security.status.message}>
                    <Icon name="error" size="sm" />
                </span>
            );
        }
    };

    renderSymbolCell = () => {
        if (!this.props.security.readOnly) {
            return (
                <input
                    type="text"
                    name="symbol"
                    value={this.props.security.symbol}
                    onChange={this.handleNameChange}
                    style={{ width: '7em' }}
                />
            );
        } else {
            return this.props.security.symbol;
        }
    };

    renderMtkValueCell = () => {
        if (!this.props.security.readOnly) {
            return (
                <input
                    type="number"
                    min="0"
                    name="mktValue"
                    value={this.props.security.mktValue}
                    style={{ width: '7em' }}
                    onChange={this.handleChanges}
                />
            );
        } else {
            return this.props.security.mktValue;
        }
    };

    render() {
        const security = this.props.security;
        const securityPortPercent = SecurityHelpers.getPercentOf(this.props.security.mktValue, this.props.total);
        const price = this.getPrice();
        const securityPortPercentNew = this.getPortPercentNew();
        const securityStatus = this.getSecurityStatus();
        return (
            <tr className="DataTable-row">
                <td className="DataTable-row-cell--symbol">
                    <div className="DataTable-colorBlock" style={{ color: 'rgba(' + security.displayColor + ', 1)' }} />
                    {this.renderSymbolCell()}
                </td>
                <td style={{ width: '8em' }}>
                    {securityStatus} &nbsp;
                    <Format format="financial" value={security.cost} />
                </td>
                <td>{this.renderMtkValueCell()}</td>
                <td>{securityPortPercent}</td>
                <td>
                    <input
                        type="number"
                        name="buyQty"
                        value={security.buyQty}
                        style={{ width: '4em' }}
                        onChange={this.handleChanges}
                    />
                </td>
                <td>
                    <Format format="financial" value={price} />
                </td>
                <td>{securityPortPercentNew}</td>
                <td className="DataTable-row-cell--actions">
                    <Button size="sm" iconName="delete_sweep" onClick={this.handleRemove} />
                </td>
            </tr>
        );
    }
}

export default SecurityRow;
