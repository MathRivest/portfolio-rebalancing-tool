import React from 'react';
import './Button.css';

import Icon from '../Icon/Icon';

let Button = (props) => {
    let sizeClass = props.size ? ' Button--' + props.size : '',
        styleClass = props.style ? ' Button--' + props.style : '',
        buttonIcon = props.iconName ? <span className="Button-icon"><Icon size="sm" name={props.iconName}/></span> : '';
    return (
        <button
            className={'Button' + styleClass + sizeClass}
            onClick={props.onClick}>
            {buttonIcon}
            <span className="Button-text">{props.children}</span>
        </button>
    )
}

export default Button;