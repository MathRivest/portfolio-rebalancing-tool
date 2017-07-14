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
        this.state = {
            filter: null,
            order: null
        }
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
        if(this.state.filter) {
            let filteredSecurities = _.orderBy(this.props.securities, [this.state.filter], [this.state.order]);
            return this.makeList(filteredSecurities);
        } else {
            return this.makeList(this.props.securities);
        }
    };

    handleFilterChange = (state) => {
        this.setState(state);
    }

    render() {
        let list = this.getFilteredList();
        return (
            <div className="SecurityList">
                <table className="DataTable">
                    <thead>
                        <SecurityListHeader onFilterChange={this.handleFilterChange}/>
                    </thead>
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