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
    '#d9d9d9',
    '#8055fc',
    //'#b44ffc',
    '#df38fd',
    //'#ff27eb',
    '#fc4b87',
    //'#f54b52',
    '#fc6529',
    //'#fa8e22',
    '#fcdb29',
    //'#fbfe2f',
    '#8cfd2a',
    //'#04fc3a',
    '#13db90',
    //'#29eae9',
    '#2fc8fd',
    //'#4c80fc',
    '#8055fc',
    //'#b44ffc',
    '#df38fd',
    //'#ff27eb',
    '#fc4b87'
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
                    message: partialSecurity.cost ? null : 'Could not update security'
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
                message: partialSecurity.cost ? null : 'Could not update security'
            }
        }
        return newSecurity;
    });
    return {
        securities: updatedList
    };
}

export {
    guid,
    colorList,
    setDisplayColors,
    createSecurity,
    addSecurity,
    removeSecurity,
    updateSecurity,
    updateSecurities
};