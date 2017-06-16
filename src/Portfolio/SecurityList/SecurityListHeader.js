import React, { Component } from 'react';

class SecurityListHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <tr className="SecurityListHeader">
                <th>Symbol</th>
                <th>Cost</th>
                <th>Mkt Val</th>
                <th>Current %</th>
                <th>Target %</th>
                <th>Buy Qty</th>
                <th>New %</th>
            </tr>
        )
    }
}

export default SecurityListHeader;