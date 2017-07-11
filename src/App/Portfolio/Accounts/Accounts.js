import React from 'react';
import _ from 'lodash';

import './Accounts.css';

// Services
import PortfolioService from '../PortfolioService';

// Helpers
import AccountHelpers from './AccountHelpers';
import SecurityHelpers from '../Security/SecurityHelpers';

// Components
import AccountsActions from './AccountsActions';
import SecurityList from '../Security/SecurityList';
import SecurityGraphs from '../Security/SecurityGraphs';
import { Button, Icon } from '../../Components';

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
        let account = {
            ...this.props.account,
            ...AccountHelpers.removeSecurity(this.props.account, security)
        };
        if(account.securities.length === 0) {
            account = {
                ...account,
                ...AccountHelpers.addSecurity(account, AccountHelpers.createSecurity())
            };
            account = {
                ...account,
                ...AccountHelpers.setDisplayColors(account)
            };
        }
        this.handleAccountChange(account);
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
        let stateObj = {
            ...this.props.account,
            ...AccountHelpers.addSecurity(this.props.account, AccountHelpers.createSecurity()),
        }
        stateObj = AccountHelpers.setDisplayColors(stateObj);
        this.handleAccountChange({
            ...this.props.account,
            ...stateObj
        });
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

    handleToggleAccount = () => {
        this.handleAccountChange({
            ...this.props.account,
            closed: !this.props.account.closed
        });
    }

    handleAccountFormChanges = (e) => {
        this.handleAccountChange({
            ...this.props.account,
            [e.target.name]: e.target.value
        });
    }

    handleRemoveButtonClick = (e) => {
        this.props.onAccountRemove(this.props.account);
    }

    accountActions = () => {
        if(this.props.account.closed) {
            return false;
        }

        return (
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
                        Clear buy
                    </Button>
                </li>
                <li>
                    <Button
                        variant="default"
                        size="sm"
                        iconName="delete"
                        onClick={this.handleRemoveButtonClick}>
                        Delete account
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
        )
    }

    accountContent = () => {
        if(this.props.account.closed) {
            return false;
        }
        const total = SecurityHelpers.getTotalWithCash(this.props.account.securities, this.props.account.cash, 'mktValue');
        return (
            <div className="Account-content">
                <SecurityList
                    securities={this.props.account.securities}
                    onSecurityChange={this.handleSecurityChange}
                    onSecurityNameChange={this.handleSecurityNameChange}
                    onSecurityRemove={this.handleSecurityRemove}
                    cash={this.props.account.cash}
                    onCashChange={this.handleCashChange}
                    total={total}/>

                <SecurityGraphs
                    securities={this.props.account.securities}
                    cash={this.props.account.cash}
                    total={total}/>
            </div>
        )
    }

    render() {
        const account = this.props.account;
        const accountActions = this.accountActions();
        const accountContent = this.accountContent();
        return (
            <div className="Account">
                <div className="Account-header">
                    <h2 className="Account-title">
                        <input
                            type="text"
                            name="name"
                            value={account.name}
                            placeholder="Enter account name..."
                            onChange={this.handleAccountFormChanges}/>
                        <Icon
                            name="mode_edit"
                            size="sm"/>
                    </h2>

                    <Button
                        iconName={account.closed ? 'expand_more': 'expand_less'}
                        iconSize="lg"
                        onClick={this.handleToggleAccount}/>
                </div>
                {accountActions}
                {accountContent}
            </div>
        )
    }
}

class Accounts extends React.Component {
    makeList = () => {
         return this.props.accounts.map((account) =>
            <Account key={account.id} account={account} onAccountChange={this.props.onAccountChange} onAccountRemove={this.props.onAccountRemove}/>
        );
    }

    render() {
        const list = this.makeList();
        return (
            <div className="Accounts">
                <AccountsActions onAccountAdd={this.props.onAccountAdd} onAccountRemove={this.props.onAccountRemove}/>
                {list}
            </div>
        )
    }
}

export default Accounts;

