import React from 'react';
import _ from 'lodash';

import Mock from './PortfolioMock.js';

import './Portfolio.css';

import PortfolioHelpers from './PortfolioHelpers';
import PortfolioActions from './PortfolioActions';
import PortfolioService from './PortfolioService';

import Accounts from './Accounts/Accounts';

import Balancer from './Balancer/Balancer';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [
            ]
        }
    }

    componentDidMount() {
        PortfolioService.getAccounts();
        _.forEach(Mock.accounts, (account) => {
            this.handleAccountAdd(account);
        });
    }

    handleAccountChange = (updatedAccount) => {
        this.setState((prevState, props) => {
            const updatedAccounts = _.map(prevState.accounts, (account) => {
                if(account.id === updatedAccount.id) {
                    account = updatedAccount;
                }
                return account;
            });
            return {
                accounts: updatedAccounts
            }
        });
        this.setState((prevState, props) => {
            return PortfolioHelpers.setDisplayColors(prevState)
        }, this.saveAccounts(this.state.accounts));
    }

    handleAccountsChange = (updatedAccounts) => {
        this.setState((prevState, props) => {
            return {
                accounts: updatedAccounts
            }
        }, this.saveAccounts(this.state.accounts));
    }

    handleAccountAdd = (account) => {
        let newAccount;
        if(account && account.id) {
            newAccount = account;
        } else {
            newAccount = PortfolioHelpers.createAccount()
        }
        this.setState((prevState, props) => {
            return PortfolioHelpers.addAccount(prevState, newAccount)
        }, this.saveAccounts(this.state.accounts));
    }

    handleAccountRemove = (account) => {
        this.setState((prevState, props) => {
            return PortfolioHelpers.removeAccount(prevState, account)
        }, this.saveAccounts(this.state.accounts));
    }

    saveAccounts = (accounts) => {
        PortfolioService.saveAccounts(accounts);
    }

    render() {
        return(
            <div className="Portfolio">

                <div className="Portfolio-accounts">
                    <div className="Portfolio-header">
                        <h3>Accounts</h3>
                        <PortfolioActions
                            onAccountAdd={this.handleAccountAdd}/>
                    </div>
                    <Accounts
                        accounts={this.state.accounts}
                        onAccountChange={this.handleAccountChange}
                        onAccountAdd={this.handleAccountAdd}
                        onAccountRemove={this.handleAccountRemove}/>
                </div>
                <div className="Portfolio-balancer">
                    <Balancer
                        accounts={this.state.accounts}
                        securities={this.state.securities}
                        onAccountChange={this.handleAccountChange}
                        onAccountsChange={this.handleAccountsChange}/>
                </div>
            </div>
        )
    }
}

export default Portfolio;