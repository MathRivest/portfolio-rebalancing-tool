import React, { Component } from 'react';

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
                <th>New (%)</th>
            </tr>
        )
    }
}

export default SecurityListHeader;