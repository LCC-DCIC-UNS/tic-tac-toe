import React from 'react';

function Square({ value, onClick }) {
    return (
        <button className="square" onClick={onClick}>
            {value !== '-' ? value : null}
        </button>
    );
}

export default Square;