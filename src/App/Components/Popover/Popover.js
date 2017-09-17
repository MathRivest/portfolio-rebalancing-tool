import React from 'react';
import './Popover.css';

let Popover = (props) => {
    if(!props.isOpen) {
        return false;
    }

    return (
        <div className="Popover">
            <div className="Popover-content">
                {props.children}
            </div>
        </div>
    )
}

export default Popover;