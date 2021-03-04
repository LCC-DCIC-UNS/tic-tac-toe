import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }

    render() {
        return (
            <div className="board">
                {this.state.squares.map((square, i) =>
                    <Square
                        value={square}
                        onClick={() => this.handleClick(i)}
                        key={i}
                    />
                )}
            </div>
        );
    }
}

export default Board;