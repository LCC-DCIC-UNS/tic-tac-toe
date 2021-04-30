import React from 'react';
import Square from './Square';
import Clue from './Clue';

class Board extends React.Component {
    render() {
        const numOfRows = this.props.grid.length;
        const numOfCols = this.props.grid[0].length;

        const rowClues = this.props.rowClues;
        const colClues = this.props.colClues;

        return (
            <div className="vertical">
                <div
                    className="colClues"
                    style={{
                        gridTemplateRows: '60px',
                        gridTemplateColumns: '60px repeat(' + numOfCols + ', 40px)'
                        /*
                           60px  40px 40px 40px 40px 40px 40px 40px   (gridTemplateColumns)
                          ______ ____ ____ ____ ____ ____ ____ ____
                         |      |    |    |    |    |    |    |    |  60px
                         |      |    |    |    |    |    |    |    |  (gridTemplateRows)
                          ------ ---- ---- ---- ---- ---- ---- ---- 
                         */
                    }}
                >
                    <div>{/* top-left corner square */}</div>
                    {colClues.map((clue, i) =>
                        <Clue clue={clue} key={i}/>
                    )}
                </div>
                <div className="horizontal">
                    <div
                        className="rowClues"
                        style={{
                            gridTemplateRows: 'repeat(' + numOfRows + ', 40px)',
                            gridTemplateColumns: '60px'
                            /* IDEM column clues above */
                        }}
                    >
                        {rowClues.map((clue, i) =>
                            <Clue clue={clue} key={i}/>
                        )}
                    </div>
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
                </div>
            </div>
        );
    }
}

export default Board;