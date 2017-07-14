import React from 'react';
import { Icon } from '../../Components';

const FilterArrow = (props) => {
    let classes = 'SecurityListHeader-arrow';
    let iconName = props.order === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down';
    if(props.filter !== props.name) {
        classes = 'SecurityListHeader-arrow SecurityListHeader-arrow--hidden';
        iconName = 'arrow_drop_down';
    }
    return (
        <span className={classes}><Icon name={iconName}/></span>
    )
}

class SecurityListHeader extends React.Component {
    order = null;
    filter = null;
    handleHeaderClick = (filter) => {
        if(this.filter !== filter){
            this.order = null;
        }

        this.filter = filter;
        if(this.order === 'desc') {
            this.order = 'asc';
        } else if(this.order ==='asc') {
            this.order = null;
            this.filter = null;
        } else {
            this.order = 'desc';
        }

        this.props.onFilterChange({
            filter: this.filter,
            order: this.order
        })
    };

    render() {
        return(
            <tr className="SecurityListHeader">
                <th
                    onClick={() => this.handleHeaderClick('symbol')}
                    className="DataTable-row-cell--left SecurityListHeader-itemSortable">
                    Symbol
                    <FilterArrow order={this.order} filter={this.filter} name={'symbol'}/>
                </th>
                <th
                    onClick={() => this.handleHeaderClick('cost')}
                    className="SecurityListHeader-itemSortable">
                    Cost ($)
                    <FilterArrow order={this.order} filter={this.filter} name={'cost'}/>
                </th>
                <th
                    onClick={() => this.handleHeaderClick('mktValue')}
                    className="SecurityListHeader-itemSortable">
                    Mkt Val ($)
                    <FilterArrow order={this.order} filter={this.filter} name={'mktValue'}/>
                </th>
                <th
                    onClick={() => this.handleHeaderClick('buyQty')}
                    className="SecurityListHeader-itemSortable">
                    Buy Qty
                    <FilterArrow order={this.order} filter={this.filter} name={'buyQty'}/>
                </th>
                <th>Price ($)</th>
                <th></th>
            </tr>
        )
    }
}

export default SecurityListHeader;