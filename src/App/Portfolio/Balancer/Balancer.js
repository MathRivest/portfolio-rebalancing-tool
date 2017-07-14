import React from 'react';
import _ from 'lodash';

import './Balancer.css';

import { Format } from '../../Components';

class Balancer extends React.Component {

    uniqSecurities = () => {
        return _.chain(this.props.accounts)
            .flatMap((n) => {
                return n.securities;
            })
            .uniqBy('symbol')
            .filter('cost')
            .value();
    }

    makeList = () => {
        let securities = this.uniqSecurities();
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
            </tr>
        );
    }

    render() {
        const list = this.makeList();
        return (
            <div className="Balancer">
                <table className="DataTable">
                    <thead>
                        <tr>
                            <th className="DataTable-row-cell--left">
                                Symbol
                            </th>
                            <th>Target</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Balancer;