import React from 'react';
import _ from 'lodash';
import './SecurityList.css';
import SecurityListHeader from './SecurityListHeader';
import SecurityRow from './SecurityRow';
import CashRow from './CashRow';
import TotalRow from './TotalRow';


class SecurityList extends React.Component {
    // filter = 'mktValue';
    // order = 'desc';


    // filteredList = _.chain(this.defaultList)
    //     .orderBy([this.filter], [this.order])
    //     .value();

    // getList = () => {
    //     if(this.filter) {
    //         return this.defaultList;
    //     } else {
    //         return this.defaultList;
    //     }
    // };

    render() {
        let defaultList = this.props.securities.map((security) =>
            <SecurityRow
                key={security.id}
                security={security}
                onSecurityChange={this.props.onSecurityChange}
                onSecurityNameChange={this.props.onSecurityNameChange}
                onSecurityRemove={this.props.onSecurityRemove}
                total={this.props.total}/>
        );
        return (
            <div>
                <table className="SecurityList">
                    <thead><SecurityListHeader /></thead>
                    <tbody>
                        {defaultList}
                    </tbody>
                    <tfoot>
                        <CashRow
                            cash={this.props.cash}
                            onCashChange={this.props.onCashChange}
                            securities={this.props.securities}
                            total={this.props.total} />
                        <TotalRow
                            securities={this.props.securities}
                            cash={this.props.cash} />
                    </tfoot>
                </table>
            </div>
        )
    };
}

export default SecurityList;