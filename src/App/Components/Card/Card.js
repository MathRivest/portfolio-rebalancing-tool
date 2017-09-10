import React from 'react';
import './Card.css';

import Icon from '../Icon/Icon';

let Card = (props) => {
    return (
        <div className="Card">
            <div
                style={{ display: props.showHelp ? 'block' : 'none' }}
                className="Card-help">
                <div
                    data-title={props.helpText}
                    data-title-position="right">
                    <Icon name="help" size="sm" />
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default Card;