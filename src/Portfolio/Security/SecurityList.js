import React from 'react';
import SecurityListHeader from './SecurityListHeader';
import SecurityRow from './SecurityRow';
import CashRow from './CashRow';
import TotalRow from './TotalRow';

let SecurityList = (props) => {
    const list = props.securities.map((security) =>
        <SecurityRow
            key={security.id}
            security={security}
            onSecurityChange={props.onSecurityChange}
            onSecurityRemove={props.onSecurityRemove}
            total={props.total}/>
    );
    return (
        <div>
            <table className="SecurityList">
                <thead><SecurityListHeader /></thead>
                <tbody>
                    {list}
                </tbody>
                <tfoot>
                    <CashRow
                        cash={props.cash}
                        onCashChange={props.onCashChange}
                        securities={props.securities}
                        total={props.total} />
                    <TotalRow
                        securities={props.securities}
                        cash={props.cash} />
                </tfoot>
            </table>
        </div>
    );
}

export default SecurityList;