import React, { Component } from 'react';
import SecurityListHeader from './SecurityListHeader';
import SecurityRow from './SecurityRow';

class SecurityList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const list = this.props.securities.map((security) =>
            <SecurityRow
                key={security.id}
                security={security}
                onSecurityChange={this.props.onSecurityChange}/>
        );

        return(
            <div>
                <table className="SecurityList">
                    <thead><SecurityListHeader/></thead>
                    <tbody>{list}</tbody>
                </table>
            </div>
        )
    }
}

export default SecurityList;