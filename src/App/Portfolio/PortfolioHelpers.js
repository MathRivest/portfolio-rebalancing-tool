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


const colorList = [
    '217,217,217',
    '128,85,252',
    //'180,79,252',
    '223,56,253',
    //'255,39,235',
    '252,75,135',
    //'245,75,82',
    '252,101,41',
    //'250,142,34',
    '252,219,41',
    //'251,254,47',
    '140,253,42',
    //'4,252,58',
    '19,219,144',
    //'41,234,233',
    '47,200,253',
    //'76,128,252',
    '128,85,252',
    //'180,79,252',
    '223,56,253',
    //'255,39,235',
    '252,75,135'
];

const setDisplayColors = (prevState) => {
    let allSecurities = _.chain(prevState.accounts)
        .flatMap((n) => {
            return n.securities;
        })
        .value();

    let uniqueSecurities = _.uniqBy(allSecurities, 'symbol');

    _.forEach(uniqueSecurities, (i, index) => {
        let color = colorList[index + 1];
        _.forEach(_.filter(allSecurities, {'symbol': i.symbol}), (o) => {
            o.displayColor = color;
        });
    });

    _.forEach(prevState.accounts, (o) => {
        o.cash.displayColor = colorList[0];
    });

    return {
        accounts: [...prevState.accounts]
    }
}

export default {
    createAccount,
    addAccount,
    removeAccount,
    setDisplayColors
};