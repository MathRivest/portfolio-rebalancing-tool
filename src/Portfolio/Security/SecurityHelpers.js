import _ from 'lodash';

const sumList = (arr, start) => {
    let acc = start || 0;
    return _.reduce(arr, (sum, val) => {
        if(_.isNumber(val)) {
            return val + sum;
        } else {
            return sum;
        }
    }, acc);
};

const multiplyValues = (multiplier, multiplicand) => {
    return _.multiply(multiplier, multiplicand)
}

const getTotalWithCash = (securities, cash, property) => {
    return sumList(_.map(securities, property), cash[property]);
}

const getPercentOf = (val, total) => {
    let result = _.round((val / total) * 100, 2);
    result = _.isNaN(result) ? 0 : result;
    return result;
}

const getTotalofMultiplied = (securities, propertyA, propertyB) => {
    return _.reduce(securities, (sum, val) => {
        return sum + multiplyValues(val[propertyA], val[propertyB]);
    }, 0);
}

const balancedWithoutSell = (securities, total, moneyLeft) => {
    return _.map(securities, (security) => {
        security.buyQty = 0;
        let price = multiplyValues(security.cost, security.buyQty);
        let newPercent = getPercentOf(security.mktValue + price, total);
        while ((newPercent < security.portPercentTarget) && (moneyLeft > security.cost)) {
            moneyLeft = moneyLeft - security.cost;
            security.buyQty = security.buyQty + 1;
            price = multiplyValues(security.cost, security.buyQty);
            newPercent = getPercentOf(security.mktValue + price, total);
        }
        return security
    });
}

const balancedWithSell = (securities, total, moneyLeft) => {
    const balancedList = _.map(securities, (security) => {
        let amountInCashNeeded = ((total * security.portPercentTarget) / 100) - security.mktValue,
            amountInUnitNeeded = Math.floor(amountInCashNeeded / security.cost);
        moneyLeft = moneyLeft - (amountInUnitNeeded * security.cost);
        security.buyQty = amountInUnitNeeded;
        return security
    });
    return _.map(balancedList, (security) => {
        while(moneyLeft && moneyLeft >= security.cost) {
            moneyLeft = moneyLeft - security.cost
            security.buyQty++
        }
    });
}

let getBalancedList = (securities, cash) => {
    const wantToSell = false;
    const total = getTotalWithCash(securities, cash, 'mktValue');
    let moneyLeft = cash.mktValue;

    if(wantToSell) {
        return balancedWithSell(securities, total, moneyLeft);
    } else {
        return balancedWithoutSell(securities, total, moneyLeft);
    }
}

export { multiplyValues, getTotalWithCash, getPercentOf, getTotalofMultiplied, getBalancedList };