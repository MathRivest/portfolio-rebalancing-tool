import AccountHelpers from './Accounts/AccountHelpers';

let guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

let createAccount = () => {
    let security = AccountHelpers.createSecurity();
    return {
        id: guid(),
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

export default {
    guid,
    createAccount,
    addAccount
};