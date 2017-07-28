import React from 'react';
import _ from 'lodash';

import './Accounts.css';

// Services
import PortfolioService from '../PortfolioService';

// Helpers
import AccountHelpers from './AccountHelpers';
import SecurityHelpers from '../Security/SecurityHelpers';

// Components
import SecurityList from '../Security/SecurityList';
import SecurityGraphs from '../Security/SecurityGraphs';
import { Button, Icon, Card } from '../../Components';

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

    componentDidMount() {
        this.setSecurities();
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

    handleAccountSecurityChange = (security) => {
        this.handleAccountChange({
            ...this.props.account,
            ...AccountHelpers.updateSecurity(this.props.account, security)
        });
    }

    handleSecurityNameChange = (security) => {
        // TODO: Change this to update symbol first then get cost
        // this.handleAccountChange({
        //     ...this.props.account,
        //     ...AccountHelpers.updateSecurity(this.props.account, security)
        // });
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
        this.handleAccountChange({
            ...this.props.account,
            ...stateObj
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

    accountContentActions = () => {
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
                        iconName="undo"
                        onClick={this.handleClearButtonClick}>
                        Clear buy
                    </Button>
                </li>
            </ul>
        )
    }

    accountContent = () => {
        if(this.props.account.closed) {
            return false;
        }
        const total = SecurityHelpers.getTotalWithCash(this.props.account.securities, this.props.account.cash.mktValue, 'mktValue');
        const accountContentActions = this.accountContentActions();
        return (
            <div>
                <div className="Account-content">
                    {accountContentActions}
                    <SecurityList
                        securities={this.props.account.securities}
                        onSecurityChange={this.handleAccountSecurityChange}
                        onSecurityNameChange={this.handleSecurityNameChange}
                        onSecurityRemove={this.handleSecurityRemove}
                        cash={this.props.account.cash}
                        onCashChange={this.handleCashChange}
                        total={total}/>

                    {/*<SecurityGraphs
                        securities={this.props.account.securities}
                        cash={this.props.account.cash}
                        total={total}/>*/}
                </div>
                <ul className="Account-actions">
                    <li>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="delete"
                            onClick={this.handleRemoveButtonClick}>
                            Delete account
                        </Button>
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        const account = this.props.account;
        const accountContent = this.accountContent();
        return (
            <div className="Account">
                <div className="Account-header">
                    <div className="Account-title">
                        <input
                            type="text"
                            name="name"
                            value={account.name}
                            placeholder="Enter account name..."
                            onChange={this.handleAccountFormChanges}/>
                        <Icon
                            name="mode_edit"
                            size="sm"/>
                    </div>

                    <Button
                        iconName={account.closed ? 'expand_more': 'expand_less'}
                        iconSize="lg"
                        onClick={this.handleToggleAccount}/>
                </div>
                {accountContent}
            </div>
        )
    }
}

class Accounts extends React.Component {
    makeList = () => {
         return this.props.accounts.map((account) =>
            <Card key={account.id}>
                <Account
                    account={account}
                    onAccountChange={this.props.onAccountChange}
                    onAccountRemove={this.props.onAccountRemove}/>
            </Card>
        );
    }

    render() {
        const list = this.makeList();
        return (
            <div className="Accounts">
                {list}
            </div>
        )
    }
}

export default Accounts;

