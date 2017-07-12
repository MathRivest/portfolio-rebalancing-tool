import _ from 'lodash';

import uuid from 'uuid/v1';

import AccountHelpers from './Accounts/AccountHelpers';

let createAccount = () => {
    let security = AccountHelpers.createSecurity();
    return {
        id: uuid(),
        name: '',
        securities: [security],
        cash: {
            symbol: 'Cash',
            mktValue: 0,
            portPercentTarget: 0
        },
        closed: false
    }
}

let addAccount = (prevState, account) => {
    let updatedList = [...prevState.accounts, account];
    return {
        accounts: updatedList
    }
}

let removeAccount = (prevState, account) => {
    let updatedList = _.filter(prevState.accounts, item => {
        return item.id !== account.id;
    });
    return {
        accounts: updatedList
    };
}

export default {
    createAccount,
    addAccount,
    removeAccount
};