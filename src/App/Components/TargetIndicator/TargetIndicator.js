import React from 'react';
import './TargetIndicator.css';

let TargetIndicator = (props) => {
    let styleClass = 'TargetIndicator--neutral';
    if(props.val > props.maxVal || props.val < props.minVal) {
        styleClass = 'TargetIndicator--danger'
    }
    return (
        <span className={'TargetIndicator ' + styleClass}>
            {props.children}
        </span>
    )
}

export default TargetIndicator;