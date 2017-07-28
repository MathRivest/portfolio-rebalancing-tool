import _ from 'lodash';
import uuid from 'uuid/v1';

let createSecurity = () => {
    return {
        id: uuid(),
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
    createSecurity,
    addSecurity,
    removeSecurity,
    updateSecurity,
    updateSecurities
};