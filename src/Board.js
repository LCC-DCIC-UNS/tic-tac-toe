import React from 'react';
import Square from './Square';

function Board({ squares, onSquareClick }) {
    return (
        <div className="board">
            {squares.map((square, i) =>
                <Square
                    value={square}
                    onClick={() => onSquareClick(i)}
                    key={i}
                />
            )}
        </div>
    );

}

export default Board;