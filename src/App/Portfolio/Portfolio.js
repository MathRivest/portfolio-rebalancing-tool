import React from 'react';
import _ from 'lodash';

import Mock from './PortfolioMock.js';

import './Portfolio.css';

import PortfolioHelpers from './PortfolioHelpers';
import PortfolioActions from './PortfolioActions';

import Accounts from './Accounts/Accounts';
import AccountHelpers from './Accounts/AccountHelpers';

import Balancer from './Balancer/Balancer';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [
            ],
            balancingConfiguration: {
                buyOnly: true
            }
        }
    }

    componentDidMount() {
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
    }

    handleBalancePortfolioButtonClick = () => {
        // const balancedSecurities = SecurityHelpers.getBalancedList(
        //     {buyOnly: true},
        //     this.props.account.securities,
        //     this.props.account.cash
        // );
        // this.handleAccountChange({
        //     ...this.props.account,
        //     ...AccountHelpers.updateSecurities(this.props.account, balancedSecurities)
        // });
    }

    handleAccountAdd = (account) => {
        let newAccount;
        if(account) {
            newAccount = account;
        } else {
            newAccount = PortfolioHelpers.createAccount()
        }
        this.setState((prevState, props) => PortfolioHelpers.addAccount(prevState, newAccount));
    }

    handleAccountRemove = (account) => {
        this.setState((prevState, props) => PortfolioHelpers.removeAccount(prevState, account));
    }

    render() {
        return(
            <div className="Portfolio">

                <div className="Portfolio-accounts">
                    <div className="Portfolio-header">
                        <h3>Accounts</h3>
                        <PortfolioActions onAccountAdd={this.handleAccountAdd}/>
                    </div>
                    <Accounts
                        accounts={this.state.accounts}
                        onAccountChange={this.handleAccountChange}
                        onAccountAdd={this.handleAccountAdd}
                        onAccountRemove={this.handleAccountRemove}/>
                </div>
                <div className="Portfolio-balancer">
                    <div className="Portfolio-header">
                        <h3>Targets</h3>
                    </div>
                    <Balancer
                        accounts={this.state.accounts}
                        securities={this.state.securities}
                        onAccountChange={this.handleAccountChange}/>
                </div>
            </div>
        )
    }
}

export default Portfolio;