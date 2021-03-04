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
      status: '?',  // values: 'X' (X is the winner), 'O' (O is the winner), 'T' (tie), '?' (game in progress)
      waiting: false
    };
    this.pengine = new PengineClient();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    // No action on click if game has ended, clicked cell is not empty, or we are waiting for game status.
    if (this.state.status !== '?' || this.state.squares[i] !== '-'  || this.state.waiting) {
      return;
    }
    // Build Prolog query to make a move and get the updated game status.
    // Calls to PengineClient.stringify() are to explicitly quote terms for player and board cells ('X', 'Y' and '-')
    // The query will be like: put('X',0,['-','-','-','-','-','-','-','-','-'],BoardRes),gameStatus(BoardRes, Status) 
    const squaresS = PengineClient.stringify(this.state.squares);
    const queryS = 'put(' + PengineClient.stringify(this.state.xIsNext ? 'X' : 'O') + ',' + i + ',' + squaresS + ',BoardRes),'
      + 'gameStatus(BoardRes, Status)';
    this.setState({
      waiting: true
    });
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          squares: response['BoardRes'],
          xIsNext: !this.state.xIsNext,
          status: response['Status'],
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
    let statusText;
    if (this.state.status === '?') {
      statusText = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else if (this.state.status === 'T') {
      statusText = 'Tie!'
    } else {
      statusText = 'Winner: ' + this.state.status;
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
