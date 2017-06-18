import React from 'react';

class SecurityListHeader extends React.Component {
    render() {
        return(
            <tr className="SecurityListHeader">
                <th>Symbol</th>
                <th>Cost ($)</th>
                <th>Target (%)</th>
                <th>Mkt Val ($)</th>
                <th>Current (%)</th>
                <th>Buy Qty</th>
                <th>Price ($)</th>
                <th>New (%)</th>
                <th></th>
            </tr>
        )
    }
}

export default SecurityListHeader;