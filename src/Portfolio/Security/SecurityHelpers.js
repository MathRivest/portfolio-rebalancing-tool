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
    // let balancedList = _.map(securities, (security) => {
    //     let amountInCashNeeded = ((total * security.portPercentTarget) / 100) - security.mktValue,
    //         amountInUnitNeeded = Math.floor(amountInCashNeeded / security.cost);
    //     if(amountInUnitNeeded > 0) {
    //         moneyLeft = moneyLeft - (amountInUnitNeeded * security.cost);
    //         security.buyQty = amountInUnitNeeded;
    //     } else {
    //         security.buyQty = 0;
    //     }
    //     return security
    // });
    // return _.map(securities, (security) => {
    //     let price = multiplyValues(security.cost, security.buyQty);
    //     let newPercent = getPercentOf(security.mktValue + price, total);

    //     let lowerThanTarget = newPercent < security.portPercentTarget;
    //     let enoughToBuy = moneyLeft > 0 && moneyLeft > security.cost;
    //     console.log(lowerThanTarget, enoughToBuy);
    //     while (enoughToBuy && lowerThanTarget) {
    //         moneyLeft = moneyLeft - security.cost;
    //         security.buyQty = security.buyQty + 1;
    //     }
        return security
    });
}

export { multiplyValues, getTotalWithCash, getPercentOf, getTotalofMultiplied, getBalanceList };