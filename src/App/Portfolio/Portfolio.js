import React from 'react';
import _ from 'lodash';
import uuid from 'uuid/v1';

import './Portfolio.css';

import PortfolioHelpers from './PortfolioHelpers';
import PortfolioActions from './PortfolioActions';

import Accounts from './Accounts/Accounts';
import Balancer from './Balancer/Balancer';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [
                {
                    id: 1,
                    name: 'TFSA - Questrade',
                    securities: [
                        {
                            id: uuid(),
                            symbol: 'VUN.TO',
                            cost: 0,
                            portPercentTarget: 25,
                            mktValue: 3716.20,
                            buyQty: 0
                        },
                        {
                            id: uuid(),
                            symbol: 'VCN.TO',
                            cost: 0,
                            portPercentTarget: 25,
                            mktValue: 3728.32,
                            buyQty: 0
                        },
                        {
                            id: uuid(),
                            symbol: 'VAB.TO',
                            cost: 0,
                            portPercentTarget: 20,
                            mktValue: 2997.20,
                            buyQty: 0
                        },
                        {
                            id: uuid(),
                            symbol: 'VDU.TO',
                            cost: 0,
                            portPercentTarget: 20,
                            mktValue: 3944.48,
                            buyQty: 0
                        },
                        {
                            id: uuid(),
                            symbol: 'ZRE.TO',
                            cost: 0,
                            portPercentTarget: 10,
                            mktValue: 1612.12,
                            buyQty: 0
                        }
                    ],
                    cash: {
                        symbol: 'Cash',
                        mktValue: 3000,
                        portPercentTarget: 0
                    },
                    closed: false
                },
                {
                    id: 2,
                    name: 'RRSP - Questrade',
                    securities: [
                        {
                            id: uuid(),
                            symbol: 'ZAG.TO',
                            cost: 0,
                            portPercentTarget: 25,
                            mktValue: 1879.96,
                            buyQty: 0
                        },
                        {
                            id: uuid(),
                            symbol: 'XAW.TO',
                            cost: 0,
                            portPercentTarget: 25,
                            mktValue: 1680.80,
                            buyQty: 0
                        },
                        {
                            id: uuid(),
                            symbol: 'VAB.TO',
                            cost: 0,
                            portPercentTarget: 20,
                            mktValue: 1270.00,
                            buyQty: 0
                        },
                        {
                            id: uuid(),
                            symbol: 'VDU.TO',
                            cost: 0,
                            portPercentTarget: 20,
                            mktValue: 1706.46,
                            buyQty: 0
                        },
                        {
                            id: uuid(),
                            symbol: 'ZRE.TO',
                            cost: 0,
                            portPercentTarget: 10,
                            mktValue: 589.80,
                            buyQty: 0
                        }
                    ],
                    cash: {
                        symbol: 'Cash',
                        mktValue: 1000,
                        portPercentTarget: 0
                    },
                    closed: true
                }
            ],
            balancingConfiguration: {
                buyOnly: true
            }
        }
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

    handleAccountAdd = () => {
        this.setState((prevState, props) => PortfolioHelpers.addAccount(prevState, PortfolioHelpers.createAccount()));
    }

    handleAccountRemove = (account) => {
        console.log('removing...', account)
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
                    <Balancer accounts={this.state.accounts}/>
                </div>
            </div>
        )
    }
}

export default Portfolio;