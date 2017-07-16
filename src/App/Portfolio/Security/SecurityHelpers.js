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
    return sumList(_.map(securities, property), cash);
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

const balancedBuyOnly = (securities, total, moneyLeft) => {
    let sortedSecurities = _.chain(securities)
        .orderBy(['cost'], ['desc'])
        .map((security) => {
            security.buyQty = 0;
            return security
        })
        .value();

    let itemCost, price, newPercent = 0;

    _.forEach(sortedSecurities, (i) => {
        price = multiplyValues(i.cost, i.buyQty);
        newPercent = getPercentOf(i.mktValue + price, total);
        itemCost = i.cost;
        while ((newPercent < i.portPercentTarget) && (moneyLeft > i.cost)) {
            moneyLeft = moneyLeft - itemCost;
            i.buyQty++
            price = multiplyValues(i.cost, i.buyQty);
            newPercent = getPercentOf(i.mktValue + price, total);
        }
    });

    return sortedSecurities;
}

const balancedWithSell = (securities, total, moneyLeft) => {
    let sortedSecurities = _.chain(securities)
        .map((security) => {
            security.buyQty = 0;
            let amountInCashNeeded = ((total * security.portPercentTarget) / 100) - security.mktValue,
                amountInUnitNeeded = Math.floor(amountInCashNeeded / security.cost);
            moneyLeft = moneyLeft - (amountInUnitNeeded * security.cost);
            security.buyQty = amountInUnitNeeded;
            return security
        })
        .orderBy(['cost'], ['desc'])
        .value();

    let itemCost = 0;
    let distribute = (securitiesToBalance) => {
        _.forEach(securitiesToBalance, (i) => {
            itemCost = i.cost;
            if(moneyLeft >= itemCost) {
                moneyLeft = moneyLeft - itemCost;
                i.buyQty++
            }
        });
    }

    _.forEach(sortedSecurities, (security) => {
        while(moneyLeft >= itemCost) {
            distribute(sortedSecurities);
        }
    });

    return sortedSecurities;
}

const getBalancedList = (config, securities, cash) => {
    const total = getTotalWithCash(securities, cash.mktValue, 'mktValue');
    const moneyLeft = cash.mktValue - (cash.portPercentTarget / 100 * total);

    if(config.buyOnly) {
        return balancedBuyOnly(securities, total, moneyLeft);
    } else {
        return balancedWithSell(securities, total, moneyLeft);
    }
}

export default { multiplyValues, getTotalWithCash, getPercentOf, getTotalofMultiplied, getBalancedList };