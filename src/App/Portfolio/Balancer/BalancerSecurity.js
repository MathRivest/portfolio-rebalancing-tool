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
        const sumOfPortPercent = this.props.sumOfPortPercent;

        return (
            <tr key={security.id}>
                <td className="DataTable-row-cell--left">
                    {security.symbol}
                </td>
                <td>
                    {sumOfPortPercent}
                </td>
                <td>
                    20
                </td>

                <td>
                    <input
                        type="number"
                        name="portPercentTarget"
                        value={security.portPercentTarget}
                        style={{width: '4em'}}
                        onChange={this.handleChanges}/>
                </td>
            </tr>
        )
    }
}

export default BalancerSecurity;