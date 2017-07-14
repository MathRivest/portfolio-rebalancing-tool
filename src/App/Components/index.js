import React from 'react';
import _ from 'lodash';
import Icon from './Icon/Icon';
import Button from './Button/Button';
import TargetIndicator from './TargetIndicator/TargetIndicator';

let Format = (props) => {
    let formattedValue;
    if(props.format === 'financial') {
        formattedValue = _.floor(props.value, 2).toFixed(2);
    } else {
        formattedValue = props.value;
    }
    return (
        <span>{formattedValue}</span>
    )
}

export { Format, Icon, Button, TargetIndicator };