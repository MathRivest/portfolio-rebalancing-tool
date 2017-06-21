import React from 'react';

// Components
import { Format } from '../../Components';

import { getPercentOf, multiplyValues } from './SecurityHelper';

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

    getPrice = () => {
        return multiplyValues(this.props.security.cost, this.props.security.buyQty);
    }

    getPortPercentNew = () => {
        let price = this.getPrice();
        return getPercentOf(this.props.security.mktValue + price, this.props.total);
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
        const securityPortPercent = getPercentOf(this.props.security.mktValue, this.props.total);
        const price = this.getPrice();
        const securityPortPercentNew = this.getPortPercentNew();
        const securityStatus = this.getSecurityStatus();
        return(
            <tr className="SecurityList-row">
                <td className="SecurityList-row-cell--left">
                    <input
                        type="text"
                        name="symbol"
                        value={security.symbol}
                        onChange={this.handleChanges}/>
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
                        onChange={this.handleChanges}/>
                </td>
                <td>
                    <input
                        type="number"
                        name="mktValue"
                        value={security.mktValue}
                        onChange={this.handleChanges}/>
                </td>
                <td>{securityPortPercent}</td>
                <td>
                    <input
                        type="number"
                        name="buyQty"
                        value={security.buyQty}
                        onChange={this.handleChanges}/>
                </td>
                <td><Format format="financial" value={price}/></td>
                <td>{securityPortPercentNew}</td>
                <td className="SecurityList-row-cell--center">
                    <button onClick={this.handleRemove}>Remove</button>
                </td>
            </tr>
        )
    }
}

export default SecurityRow;