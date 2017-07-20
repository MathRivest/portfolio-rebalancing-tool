import React from 'react';

class BalancerHeader extends React.Component {

    render() {
        return (
            <tr>
                <th className="DataTable-row-cell--left">
                    Symbol
                </th>
                <th>
                    Target (%)
                </th>
                <th>
                    Current (%)
                </th>
                <th>
                    New (%)
                </th>
            </tr>
        )
    }
}

export default BalancerHeader;


