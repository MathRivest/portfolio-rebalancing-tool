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

let getTotalWithCash = (securities, cash, property) => {
    let sum = sumList(_.map(securities, property), cash[property]);
    return _.round(sum, 2);
}

let getPercentOf = (val, total) => {
    return _.round((val / total) * 100, 2);
}

export { getTotalWithCash, getPercentOf };