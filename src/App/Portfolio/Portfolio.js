import React from 'react';
import _ from 'lodash';
import ReactGA from 'react-ga';

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
        };
    }

    componentDidMount() {
        const portfolioProvider = this.props.provider ? this.props.provider : PortfolioService;

        portfolioProvider.getAccounts().then(accounts => {
            _.forEach(accounts, account => {
                account.securities = _.orderBy(account.securities, ['symbol'], ['asc']);
                this.handleAccountAdd(account);
            });
        });
    }

    handleAccountChange = updatedAccount => {
        this.setState((prevState, props) => {
            const updatedAccounts = _.map(prevState.accounts, account => {
                if (account.id === updatedAccount.id) {
                    account = updatedAccount;
                }
                return account;
            });
            return {
                accounts: updatedAccounts
            };
        });
        this.setState((prevState, props) => {
            const updatedState = PortfolioHelpers.setDisplayColors(prevState);
            this.saveAccounts(updatedState.accounts);
            return updatedState;
        });
    };

    handleAccountsChange = updatedAccounts => {
        this.setState((prevState, props) => {
            this.saveAccounts(updatedAccounts);
            return {
                accounts: updatedAccounts
            };
        });
    };

    handleAccountAdd = account => {
        let newAccount;
        if (account && account.id) {
            newAccount = account;
        } else {
            newAccount = PortfolioHelpers.createAccount();
        }
        this.setState((prevState, props) => {
            const updatedState = PortfolioHelpers.addAccount(prevState, newAccount);
            this.saveAccounts(updatedState.accounts);
            return updatedState;
        });
    };

    handleAccountRemove = account => {
        this.setState((prevState, props) => {
            const updatedState = PortfolioHelpers.removeAccount(prevState, account);
            this.saveAccounts(updatedState.accounts);
            return updatedState;
        });
    };

    handleAddAccountClick = () => {
        this.handleAccountAdd();
        ReactGA.event({
            category: 'Account',
            action: 'Add'
        });
    };

    saveAccounts = accounts => {
        PortfolioService.saveAccounts(accounts);
    };

    render() {
        if (this.state.accounts.length === 0) {
            return (
                <div className="Portfolio">
                    <div className="Portfolio-empty">
                        <Card>
                            <h2 className="Portfolio-empty-title">Your porfolio is empty!</h2>
                            <p className="Portfolio-empty-subtitle">
                                Get started by adding an account. You will then be able to add securities, set your
                                targets and visualize your portfolio!
                            </p>
                            <p className="Portfolio-empty-cta">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    position="center"
                                    onClick={this.handleAddAccountClick}
                                >
                                    Add an Account
                                </Button>
                                <Button size="lg" position="center" onClick={this.handleAddAccountClick}>
                                    Learn More
                                </Button>
                            </p>
                        </Card>
                    </div>
                </div>
            );
        }

        return (
            <div className="Portfolio">
                <div className="Portfolio-body">
                    <div className="Portfolio-header">
                        <h3>Accounts</h3>
                        <PortfolioActions onAccountAdd={this.handleAddAccountClick} />
                    </div>
                    <Accounts
                        accounts={this.state.accounts}
                        onAccountChange={this.handleAccountChange}
                        onAccountRemove={this.handleAccountRemove}
                    />

                    <Card>
                        <div className="Card-body">
                            <h3>Security</h3>
                            <p>
                                Everything you enter is secure, nothing is sent to any server. Your data is kept in your
                                brower's local storage so when you come back, your stored portfolio will be used.
                            </p>
                            <h3>Limitations</h3>
                            <p>
                                Currently, everything you enter is assumed to be in CAD currency. We will add more
                                support in the future.
                            </p>
                        </div>
                    </Card>
                    <br />
                </div>
                <div className="Portfolio-balancer">
                    <Balancer
                        accounts={this.state.accounts}
                        securities={this.state.securities}
                        onAccountChange={this.handleAccountChange}
                        onAccountsChange={this.handleAccountsChange}
                    />
                </div>
            </div>
        );
    }
}

export default Portfolio;
