import React from 'react';
import { numberToColor } from './util';

function Square({ value, onClick, onMouseEnter, className }) {
    // value === 0 means the square is empty.    
    return (
        <div
            className={"square" + (className ? " " + className : "")}
            style={value === 0 ? undefined : { backgroundColor: numberToColor(value) }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {value === 0 ? "" : value}
        </div>
    );
}

export default Square;