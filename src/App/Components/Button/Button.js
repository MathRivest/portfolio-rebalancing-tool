import React from 'react';
import './Button.css';

import Icon from '../Icon/Icon';

let Button = (props) => {
    let sizeClass = props.size ? ' Button--' + props.size : '',
        variantClass = props.variant ? ' Button--' + props.variant : '',
        buttonIconSize = props.iconSize ? props.iconSize : 'sm',
        positionClass= props.position ? ' Button--' + props.position : '',
        buttonIcon = props.iconName ? <span className="Button-icon"><Icon size={buttonIconSize} name={props.iconName}/></span> : '';
    return (
        <button
            className={'Button' + variantClass + sizeClass + positionClass}
            onClick={props.onClick}
            disabled={props.disabled}>
            {buttonIcon}
            <span className="Button-text">{props.children}</span>
        </button>
    )
}

export default Button;