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
    // No action on click if game has ended, we are waiting for game status, or clicked cell is not empty.
    if (this.state.status !== '?' || this.state.waiting) {
      return;
    }
    const squaresS = PengineClient.stringify(this.state.squares);
    const queryS = "put(" + PengineClient.stringify(this.state.xIsNext ? "X" : "O") + "," + i + "," + squaresS + ",BoardRes),"
      + "gameStatus(BoardRes, Status)";
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
        });
      } else {
        this.setState({
          waiting: false
        });
      }
    });
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
        </div>
      </div>
    );
  }
}

export default Game;
