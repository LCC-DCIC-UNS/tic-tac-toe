import './Game.css';
import React from 'react';
import PengineClient from './PengineClient';
import Board from './Board';

class Game extends React.Component {
  
  pengine;

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill('-'),
      xIsNext: true,
      status: '?',
      waiting: false
    };
    this.pengine = new PengineClient();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    // No action on click if game has ended, we are waiting for game status, or clicked cell is not empty.
    if (this.state.status !== '?' || this.state.waiting) {
      return;
    }
    const squaresS = PengineClient.stringify(this.state.squares);
    const queryS = "put(" + PengineClient.stringify(this.state.xIsNext ? 'X' : 'O') + ", " + i + ", " + squaresS + ", BoardRes), gameStatus(BoardRes, Status)";
    this.setState({
      waiting: true
    });
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          squares: response["BoardRes"],
          xIsNext: !this.state.xIsNext,
          status: response["Status"],
          waiting: false
        })
      } else {
        this.setState({
          waiting: false
        })
      }
    });
  }

  test(query) {
    this.pengine.query(query, (success, response, more) => {
      console.log("Answer to " + query + ":");
      console.log(success ? response : "false");
      more && console.log("more");
    });
  }

  testNext() {
    this.pengine.next((success, response, more) => {
      console.log("Next solution:");
      console.log(success ? response : "false");
      more && console.log("more");
    });
  }

  testError() {
    this.pengine.query("0 is X", () => {});
  }

  render() {
    let status;
    if (this.state.status === '?') {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else if (this.state.status === 'tie') {
      status = 'Tie!'
    } else {
      status = 'Winner: ' + this.state.status;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.test("X=a")}>
              test
            </button>
            <button onClick={() => this.test("member(X, [a, b, c])")}>
              test multi-solutions
            </button>
            <button onClick={() => this.test("X\\=a")}>
              test fail
            </button>
            <button onClick={() => this.testNext()}>
              test next
            </button>
            <button onClick={() => this.testError()}>
              test error
            </button>
            </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
