import React from 'react';
import Square from './Square';

class Board extends React.Component {
    render() {
        return (
            <div className="board">
                {this.props.squares.map((square, i) =>
                    <Square
                        value={square}
                        onClick={() => this.props.onClick(i)}
                        key={i}
                    />
                )}
            </div>
        );
    }
}

export default Board;