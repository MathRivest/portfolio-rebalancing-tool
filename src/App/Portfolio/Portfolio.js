import React from 'react';
import _ from 'lodash';
import './Portfolio.css';

import PortfolioHelpers from './PortfolioHelpers';

import Accounts from './Accounts/Accounts';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [
                // {
                //     id: 1,
                //     name: 'Account 1',
                //     securities: [
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'VUN.TO',
                //             cost: 0,
                //             portPercentTarget: 25,
                //             mktValue: 3825.00,
                //             buyQty: 0
                //         },
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'VCN.TO',
                //             cost: 0,
                //             portPercentTarget: 25,
                //             mktValue: 3753.94,
                //             buyQty: 0
                //         },
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'VAB.TO',
                //             cost: 0,
                //             portPercentTarget: 20,
                //             mktValue: 3052.66,
                //             buyQty: 0
                //         },
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'VDU.TO',
                //             cost: 0,
                //             portPercentTarget: 20,
                //             mktValue: 3050.96,
                //             buyQty: 0
                //         },
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'ZRE.TO',
                //             cost: 0,
                //             portPercentTarget: 10,
                //             mktValue: 1659.68,
                //             buyQty: 0
                //         }
                //     ],
                //     cash: {
                //         symbol: 'Cash',
                //         mktValue: 2000,
                //         portPercentTarget: 0
                //     },
                //     closed: false
                // },
                // {
                //     id: 2,
                //     name: 'Account 2',
                //     securities: [
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'VUN.TO',
                //             cost: 0,
                //             portPercentTarget: 25,
                //             mktValue: 3825.00,
                //             buyQty: 0
                //         },
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'VCN.TO',
                //             cost: 0,
                //             portPercentTarget: 25,
                //             mktValue: 3753.94,
                //             buyQty: 0
                //         },
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'VAB.TO',
                //             cost: 0,
                //             portPercentTarget: 20,
                //             mktValue: 3052.66,
                //             buyQty: 0
                //         },
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'VDU.TO',
                //             cost: 0,
                //             portPercentTarget: 20,
                //             mktValue: 3050.96,
                //             buyQty: 0
                //         },
                //         {
                //             id: PortfolioHelpers.guid(),
                //             symbol: 'ZRE.TO',
                //             cost: 0,
                //             portPercentTarget: 10,
                //             mktValue: 1659.68,
                //             buyQty: 0
                //         }
                //     ],
                //     cash: {
                //         symbol: 'Cash',
                //         mktValue: 2000,
                //         portPercentTarget: 0
                //     },
                //     closed: true
                // }
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
                <Accounts
                    accounts={this.state.accounts}
                    onAccountChange={this.handleAccountChange}
                    onAccountAdd={this.handleAccountAdd}
                    onAccountRemove={this.handleAccountRemove}/>
            </div>
        )
    }
}

export default Portfolio;