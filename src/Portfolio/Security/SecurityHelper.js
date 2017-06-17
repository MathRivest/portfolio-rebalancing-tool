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

let computeTotalWithCash = (securities, cash, property) => {
    return sumList(_.map(securities, property), cash[property]);
}


export { computeTotalWithCash };