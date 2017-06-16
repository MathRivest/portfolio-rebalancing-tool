import React, { Component } from 'react';
import SecurityListHeader from './SecurityListHeader';
import SecurityRow from './SecurityRow';

function SecurityList(props) {
    const list = props.securities.map((security) =>
        <SecurityRow
            key={security.id}
            security={security}
            onSecurityChange={props.onSecurityChange}/>
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

export default SecurityList;