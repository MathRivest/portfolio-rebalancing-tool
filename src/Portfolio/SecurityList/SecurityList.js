import React, { Component } from 'react';
import SecurityListHeader from './SecurityListHeader';
import SecurityRow from './SecurityRow';
import CashRow from './CashRow';

let SecurityList = (props) => {
    const list = props.securities.map((security) =>
        <SecurityRow
            key={security.id}
            security={security}
            onSecurityChange={props.onSecurityChange}
            onSecurityRemove={props.onSecurityRemove}/>
    );
    return(
        <div>
            <table className="SecurityList">
                <thead><SecurityListHeader/></thead>
                <tbody>
                    {list}
                    <CashRow
                        cash={props.cash}
                        onCashChange={props.onCashChange}/>
                </tbody>
            </table>
        </div>
    );
}

export default SecurityList;