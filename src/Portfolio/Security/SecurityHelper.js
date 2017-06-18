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
    return _.floor(_.multiply(multiplier, multiplicand), 2)
}

let getTotalWithCash = (securities, cash, property) => {
    let sum = sumList(_.map(securities, property), cash[property]);
    return _.floor(sum, 2);
}

let getPercentOf = (val, total) => {
    return _.round((val / total) * 100, 2);
}

let getResultTotal = (securities, propertyA, propertyB) => {
    let total = _.reduce(securities, (sum, val) => {
        return sum + multiplyValues(val[propertyA], val[propertyB]);
    }, 0);
    return _.floor(total, 2);
}

export { multiplyValues, getTotalWithCash, getPercentOf, getResultTotal };