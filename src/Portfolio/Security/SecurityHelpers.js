import _ from 'lodash';

let sumList = (arr, start) => {
    let acc = start || 0;
    return _.reduce(arr, (sum, val) => {
        if(_.isNumber(val)) {
            return val + sum;
        } else {
            return sum;
        }
    }, acc);
};

let multiplyValues = (multiplier, multiplicand) => {
    return _.multiply(multiplier, multiplicand)
}

let getTotalWithCash = (securities, cash, property) => {
    return sumList(_.map(securities, property), cash[property]);
}

let getPercentOf = (val, total) => {
    let result = _.round((val / total) * 100, 2);
    result = _.isNaN(result) ? 0 : result;
    return result;
}

let getTotalofMultiplied = (securities, propertyA, propertyB) => {
    return _.reduce(securities, (sum, val) => {
        return sum + multiplyValues(val[propertyA], val[propertyB]);
    }, 0);
}

let getBalanceList = (securities, cash) => {
    let total = getTotalWithCash(securities, cash, 'mktValue');
    let moneyLeft = cash.mktValue;
    let balancedList = _.map(securities, (security) => {
        let amountInCashNeeded = ((total * security.portPercentTarget) / 100) - security.mktValue,
            amountInUnitNeeded = Math.floor(amountInCashNeeded / security.cost);
        moneyLeft = moneyLeft - (amountInUnitNeeded * security.cost);
        security.buyQty = amountInUnitNeeded;
        return security
    });
    return _.map(balancedList, (security) => {
        while (moneyLeft > 0 && moneyLeft > security.cost) {
            moneyLeft = moneyLeft - security.cost;
            security.buyQty = security.buyQty + 1;
        }
        return security
    });
}

export { multiplyValues, getTotalWithCash, getPercentOf, getTotalofMultiplied, getBalanceList };