import React from 'react';
import './Button.css';

import Icon from '../Icon/Icon';

let Button = (props) => {
    let sizeClass = props.size ? ' Button--' + props.size : '',
        variantClass = props.variant ? ' Button--' + props.variant : '',
        buttonIcon = props.iconName ? <span className="Button-icon"><Icon size="sm" name={props.iconName}/></span> : '';
    return (
        <button
            className={'Button' + variantClass + sizeClass}
            onClick={props.onClick}>
            {buttonIcon}
            <span className="Button-text">{props.children}</span>
        </button>
    )
}

export default Button;