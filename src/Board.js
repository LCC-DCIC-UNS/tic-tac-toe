import React from 'react';
import Square from './Square';

class Board extends React.Component {
    render() {
        const numOfRows = this.props.grid.length;
        const numOfCols = this.props.grid[0].length;
        return (
            <div className="board" 
                 style={{
                    gridTemplateRows: 'repeat(' + numOfRows + ', 40px)',
                    gridTemplateColumns: 'repeat(' + numOfCols + ', 40px)'
                 }}>
                {this.props.grid.map((row, i) =>
                    row.map((cell, j) =>
                        <Square
                            value={cell}
                            onClick={() => this.props.onClick(i, j)}
                            key={i + j}
                        />
                    )
                )}
            </div>
        );
    }
}

export default Board;