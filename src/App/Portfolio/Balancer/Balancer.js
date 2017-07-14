import React from 'react';
import _ from 'lodash';

import './Balancer.css';

import { TargetIndicator } from '../../Components';

class Balancer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            securities: []
        }
    }

    componentDidMount() {
    }

    makeHeader = () => {
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

    makeList = () => {
        let securities = this.props.securities;
        return securities.map((security) =>
            <tr key={security.id}>
                <td className="DataTable-row-cell--left">
                    {security.symbol}
                </td>

                <td>
                    <input
                        type="number"
                        name="portPercentTarget"
                        value={security.portPercentTarget}
                        style={{width: '4em'}}
                        onChange={this.handleChanges}/>
                </td>
                <td>
                    20
                </td>
                <td>
                    20
                </td>
            </tr>
        );
    }

    makeFooter = () => {
        return (
            <tr>
                <td className="DataTable-row-cell--left">Total</td>
                <td>
                    <TargetIndicator val={99} minVal={100}  maxVal={100}>
                        {99}
                    </TargetIndicator>
                </td>
                <td></td>
                <td></td>
            </tr>
        )
    }

    render() {
        const header = this.makeHeader();
        const list = this.makeList();
        const footer = this.makeFooter();
        return (
            <div className="Balancer">
                <table className="DataTable">
                    <thead>
                        {header}
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                    <tfoot>
                        {footer}
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default Balancer;