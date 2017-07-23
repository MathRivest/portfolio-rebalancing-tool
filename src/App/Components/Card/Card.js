import React from 'react';
import './Card.css';

let Card = (props) => {
    return (
        <div className="Card">
            {props.children}
        </div>
    )
}

export default Card;