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

export { multiplyValues, getTotalWithCash, getPercentOf, getTotalofMultiplied };