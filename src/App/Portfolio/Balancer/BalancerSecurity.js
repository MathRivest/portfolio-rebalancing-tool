import React from 'react';

class BalancerSecurity extends React.Component {

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

    render() {
        const security = this.props.security;
        const portPercent = this.props.portPercent;
        const newPortPercent = this.props.newPortPercent;

        return (
            <tr key={security.id}>
                <td className="DataTable-row-cell--left">
                    {security.symbol}
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
                    {portPercent}
                </td>
                <td>
                    {newPortPercent}
                </td>
            </tr>
        )
    }
}

export default BalancerSecurity;