import React from 'react';
import * as SecurityHelpers from './SecurityHelpers';
import { Format, Icon } from '../../Components';

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

    handleNameChange = (e) => {
        this.props.onSecurityNameChange({
            ...this.props.security,
            [e.target.name]: e.target.value
        });
    }

    handleRemove = (e) => {
        this.props.onSecurityRemove(this.props.security);
    }

    getPrice = () => {
        return SecurityHelpers.multiplyValues(this.props.security.cost, this.props.security.buyQty);
    }

    getPortPercentNew = () => {
        let price = this.getPrice();
        return SecurityHelpers.getPercentOf(this.props.security.mktValue + price, this.props.total);
    }

    getSecurityStatus = () => {
        const security = this.props.security;
        const status = security.status;
        if(status && status.type === 'Failed') {
            return status.type;
        }
    }

    render() {
        const security = this.props.security;
        const securityPortPercent = SecurityHelpers.getPercentOf(this.props.security.mktValue, this.props.total);
        const price = this.getPrice();
        const securityPortPercentNew = this.getPortPercentNew();
        const securityStatus = this.getSecurityStatus();
        return(
            <tr className="SecurityList-row">
                <td className="SecurityList-row-cell--symbol">
                    <input
                        type="text"
                        name="symbol"
                        value={security.symbol}
                        onChange={this.handleNameChange}
                        style={{width: '7em'}}/>
                </td>
                <td>
                    {securityStatus} &nbsp;
                    <Format format="financial" value={security.cost}/>
                </td>
                <td>
                    <input
                        type="number"
                        name="portPercentTarget"
                        value={security.portPercentTarget}
                        style={{width: '4em'}}
                        onChange={this.handleChanges}/>
                </td>
                <td>
                    <input
                        type="number"
                        name="mktValue"
                        value={security.mktValue}
                        style={{width: '7em'}}
                        onChange={this.handleChanges}/>
                </td>
                <td>{securityPortPercent}</td>
                <td>
                    <input
                        type="number"
                        name="buyQty"
                        value={security.buyQty}
                        style={{width: '4em'}}
                        onChange={this.handleChanges}/>
                </td>
                <td><Format format="financial" value={price}/></td>
                <td>{securityPortPercentNew}</td>
                <td className="SecurityList-row-cell--actions">
                    <button
                        className="Button Button--sm"
                        onClick={this.handleRemove}>
                        <span className="Button-icon">
                            <Icon name="delete_sweep" size="sm"/>
                        </span>
                    </button>
                </td>
            </tr>
        )
    }
}

export default SecurityRow;