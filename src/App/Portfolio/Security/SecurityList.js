import React from 'react';
import _ from 'lodash';
import './SecurityList.css';
import SecurityListHeader from './SecurityListHeader';
import SecurityRow from './SecurityRow';
import CashRow from './CashRow';
import TotalRow from './TotalRow';


class SecurityList extends React.Component {
    constructor(props) {
        super(props);
        this.filter = null;
        this.order = null;
    }

    makeList = (securities) => {
         return securities.map((security) =>
            <SecurityRow
                key={security.id}
                security={security}
                onSecurityChange={this.props.onSecurityChange}
                onSecurityNameChange={this.props.onSecurityNameChange}
                onSecurityRemove={this.props.onSecurityRemove}
                total={this.props.total}/>
        );
    }

    getFilteredList = () => {
        if(this.filter) {
            let filteredSecurities = _.chain(this.props.securities)
                .orderBy([this.filter], [this.order])
                .value();
            return this.makeList(filteredSecurities);
        } else {
            return this.makeList(this.props.securities);
        }
    };

    setFilters = (filter, order) => {
        this.filter = filter;
        this.order = order;
    }

    render() {
        let list = this.getFilteredList();
        let handleFilterChange = (filter, order) => {
            this.setFilters(filter, order);
            list = this.getFilteredList();
        }

        return (
            <div>
                <table className="SecurityList">
                    <thead><SecurityListHeader onFilterChange={handleFilterChange}  /></thead>
                    <tbody>
                        {list}
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