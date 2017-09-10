import React from 'react';
import _ from 'lodash';

import PortfolioHelpers from './PortfolioHelpers';
import PortfolioActions from './PortfolioActions';
import PortfolioService from './PortfolioService';
import './Portfolio.css';
import Accounts from './Accounts/Accounts';
import Balancer from './Balancer/Balancer';
import { Button, Card } from '../Components';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        }
    }

    componentDidMount() {
        const accounts = PortfolioService.getAccounts();
        _.forEach(accounts, (account) => {
            account.securities = _.orderBy(account.securities, ['symbol'], ['asc']);
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
            const updatedState = PortfolioHelpers.setDisplayColors(prevState);
            this.saveAccounts(updatedState.accounts);
            return updatedState
        });
    }

    handleAccountsChange = (updatedAccounts) => {
        this.setState((prevState, props) => {
            this.saveAccounts(updatedAccounts);
            return {
                accounts: updatedAccounts
            }
        });
    }

    handleAccountAdd = (account) => {
        let newAccount;
        if(account && account.id) {
            newAccount = account;
        } else {
            newAccount = PortfolioHelpers.createAccount()
        }
        this.setState((prevState, props) => {
            const updatedState = PortfolioHelpers.addAccount(prevState, newAccount);
            this.saveAccounts(updatedState.accounts);
            return updatedState;
        });
    }

    handleAccountRemove = (account) => {
        this.setState((prevState, props) => {
            const updatedState = PortfolioHelpers.removeAccount(prevState, account);
            this.saveAccounts(updatedState.accounts);
            return updatedState;
        });
    }

    saveAccounts = (accounts) => {
        PortfolioService.saveAccounts(accounts);
    }

    render() {
        if(this.state.accounts.length === 0) {
            return(
                <div className="Portfolio">
                    <div className="Portfolio-empty">
                        <Card>
                            <h2 className="Portfolio-empty-title">Your porfolio is empty!</h2>
                            <p className="Portfolio-empty-subtitle">Get started by adding an account. You will then be able to add securities, set your targets and visualize your portfolio!</p>
                            <p className="Portfolio-empty-cta">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    position="center"
                                    onClick={this.handleAccountAdd}>
                                    Add an Account
                                </Button>
                                <Button
                                    size="lg"
                                    position="center"
                                    onClick={this.handleAccountAdd}>
                                    Learn More
                                </Button>
                            </p>
                        </Card>
                    </div>
                </div>
            )
        }

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