import _ from 'lodash';

let guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
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
    return {
        securities: _.map(prevState.securities, (security, index) => {
            security.displayColor = colorList[index + 1];
            return security;
        }),
        cash: {
            ...prevState.cash,
            displayColor:  colorList[0]
        }
    }
}

let createSecurity = () => {
    return {
        id: guid(),
        symbol: '',
        cost: 0,
        portPercentTarget: 0,
        mktValue: 0,
        buyQty: 0
    }
}

let addSecurity = (prevState, security) => {
    let updatedList = [...prevState.securities, security];
    return {
        securities: updatedList
    }
}

let removeSecurity = (prevState, security) => {
    let updatedList = _.filter(prevState.securities, item => {
        return item.id !== security.id;
    });
    return {
        securities: updatedList
    };
}

let updateSecurity = (prevState, security, partialSecurity) => {
    let updatedList = prevState.securities.map((i) => {
        if(i.id === security.id) {
            if(partialSecurity && security.symbol === partialSecurity.symbol) {
                i = _.assign(security, partialSecurity);
                i.status = {
                    type: partialSecurity.cost ? 'Success' : 'Failed',
                    message: partialSecurity.cost ? null : 'Could not find cost. Try another symbol.'
                }
            } else if(security.symbol === '') {
                i = _.assign(security, partialSecurity);
                i.cost = 0;
                i.status = {
                    type: 'Failed',
                    message: 'Could not update security'
                }
            } else {
                i = security;
            }
        }
        return i;
    });
    return {
        securities: updatedList
    };
}

let updateSecurities = (prevState, partialSecurities) => {
    let updatedList = prevState.securities.map((security) => {
        let partialSecurity = _.find(partialSecurities, {'symbol': security.symbol});
        let newSecurity = _.assign(security, partialSecurity);
        if(partialSecurity) {
            newSecurity.status = {
                type: partialSecurity.cost ? 'Success' : 'Failed',
                message: partialSecurity.cost ? null : 'Could not find cost. Try another symbol.'
            }
        }
        return newSecurity;
    });
    return {
        securities: updatedList
    };
}

export default {
    colorList,
    setDisplayColors,
    createSecurity,
    addSecurity,
    removeSecurity,
    updateSecurity,
    updateSecurities
};