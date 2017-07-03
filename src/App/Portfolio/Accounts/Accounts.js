import React from 'react';
import _ from 'lodash';

import './Accounts.css';

import PortfolioService from '../PortfolioService';
import AccountHelpers from './AccountHelpers';
import SecurityHelpers from '../Security/SecurityHelpers';

import SecurityList from '../Security/SecurityList';
import SecurityGraphs from '../Security/SecurityGraphs';

import { Button } from '../../Components';

class Account extends React.Component {

    handleAccountChange = (account) => {
        this.props.onAccountChange(account);
    }

    setSecurities = () => {
        const symbols = this.props.account.securities.map((security) => {
            return security.symbol;
        });

        PortfolioService.getSecurities(symbols)
            .then((resp) => {
                this.handleAccountChange({
                    ...this.props.account,
                    ...AccountHelpers.updateSecurities(this.props.account, resp)
                })
            });
    }

    setDisplayColors = () => {
        this.handleAccountChange({
            ...this.props.account,
            ...AccountHelpers.setDisplayColors(this.props.account)
        })
    }

    componentDidMount() {
        this.setSecurities();
        this.setDisplayColors();
    }

    handleSecurityRemove = (security) => {
        this.handleAccountChange({
            ...this.props.account,
            ...AccountHelpers.removeSecurity(this.props.account, security)
        });

        // if(this.props.account.length === 1) {
        //     this.handleAccountChange({
        //         ...this.props.account,
        //         ...AccountHelpers.addSecurity(this.props.account, AccountHelpers.createSecurity())
        //     });
        // }
    }

    handleSecurityChange = (security) => {
        this.handleAccountChange({
            ...this.props.account,
            ...AccountHelpers.updateSecurity(this.props.account, security)
        });
    }

    handleSecurityNameChange = (security) => {
        PortfolioService.getSecurities([security.symbol])
            .then((resp) => {
                this.handleAccountChange({
                    ...this.props.account,
                    ...AccountHelpers.updateSecurity(this.props.account, security, resp[0])
                });
            });
    }

    handleCashChange = (cash) => {
        this.handleAccountChange({
            ...this.props.account,
            cash
        });
    }

    handleRefreshButtonClick = () => {
        this.setSecurities();
    }

    handleAddButtonClick = () => {
        this.handleAccountChange({
            ...this.props.account,
            ...AccountHelpers.addSecurity(this.props.account, AccountHelpers.createSecurity())
        });
        //this.setDisplayColors();
    }

    handleBalancePortfolioButtonClick = () => {
        const balancedSecurities = SecurityHelpers.getBalancedList(
            {buyOnly: true},
            this.props.account.securities,
            this.props.account.cash
        );
        this.handleAccountChange({
            ...this.props.account,
            ...AccountHelpers.updateSecurities(this.props.account, balancedSecurities)
        });
    }

    handleClearButtonClick = () => {
        const clearedSecurities = _.map(this.props.account.securities, (security) => {
            security.buyQty = 0;
        });
        this.handleAccountChange({
            ...this.props.account,
            ...AccountHelpers.updateSecurities(this.props.account, clearedSecurities)
        });
    }

    handleBalancingConfigurationBuyOnlyChange = (e) => {
        let balancingConfiguration = {
            [e.target.name]: e.target.checked
        };
        this.setState({
            balancingConfiguration: balancingConfiguration
        });
    }

    render() {
        const account = this.props.account;
        const total = SecurityHelpers.getTotalWithCash(account.securities, account.cash, 'mktValue');
        return (
            <div className="Account">
                <div className="Account-header">
                    <h2 className="Account-title">{account.name}</h2>
                    <ul className="Account-actions">
                        <li>
                            <Button
                                variant="default"
                                size="sm"
                                iconName="add"
                                onClick={this.handleAddButtonClick}>
                                Add security
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="default"
                                size="sm"
                                iconName="update"
                                onClick={this.handleRefreshButtonClick}>
                                Refresh quotes
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="default"
                                size="sm"
                                iconName="donut_large"
                                onClick={this.handleBalancePortfolioButtonClick}>
                                Balance
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="default"
                                size="sm"
                                iconName="undo"
                                onClick={this.handleClearButtonClick}>
                                Clear Buy
                            </Button>
                        </li>
                        {/*<li>
                            <div className="Checkbox">
                                <label htmlFor="buyOnly">
                                    <input
                                        id="buyOnly"
                                        type="checkbox"
                                        name="buyOnly"
                                        checked={this.state.balancingConfiguration.buyOnly}
                                        onChange={this.handleBalancingConfigurationBuyOnlyChange}/>
                                        Buy Only
                                </label>
                            </div>
                        </li>*/}
                    </ul>
                </div>

                <SecurityList
                    securities={account.securities}
                    onSecurityChange={this.handleSecurityChange}
                    onSecurityNameChange={this.handleSecurityNameChange}
                    onSecurityRemove={this.handleSecurityRemove}
                    cash={account.cash}
                    onCashChange={this.handleCashChange}
                    total={total}/>

                <SecurityGraphs
                    securities={account.securities}
                    cash={account.cash}
                    total={total}/>
            </div>
        )
    }
}

class Accounts extends React.Component {
    makeList = () => {
         return this.props.accounts.map((account) =>
            <Account key={account.id} account={account} onAccountChange={this.props.onAccountChange}/>
        );
    }

    render() {
        const list = this.makeList();
        return (
            <div>{list}</div>
        )
    }
}

export default Accounts;

