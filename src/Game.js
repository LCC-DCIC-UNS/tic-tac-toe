import React from 'react';
import Board from './Board';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill("-"),
      xIsNext: true,
      status: '?',  // values: 'X' (X is the winner), 'O' (O is the winner), 'T' (tie), '?' (game in progress)
      waiting: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  gameStatus(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] !== "-" && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(square => square !== "-")) {
      return 'T';
    }
    return '?';
  }

  handleClick(i) {
    // No action on click if game has ended, we are waiting for game status, or clicked cell is not empty.
    if (this.state.status !== '?' || this.state.waiting || this.state.squares[i] !== '-') {
      return;
    }
    // Make the move, and update game status
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "O";  
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      status: this.gameStatus(squares),
      waiting: false
    });
  }

  render() {
    const status = this.state.status;
    let statusText;
    if (status === "?") {
      statusText = "Next player: " + (this.state.xIsNext ? "X" : "O");
    } else if (status === "T") {
      statusText = "Tie!"
    } else {
      statusText = "Winner: " + status;
    }
    return (
      <div className="game">
        <Board
          squares={this.state.squares}
          onClick={i => this.handleClick(i)}
        />
        <div className="gameInfo">
          {statusText}
        </div>
      </div>
    );
  }
}

export default Game;
