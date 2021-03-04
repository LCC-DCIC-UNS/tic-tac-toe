import React from 'react';
import Board from './Board';

class Game extends React.Component {

  render() {
    return (
      <div className="game">
        <Board />
        <div className="gameInfo">
          {/* status */}
        </div>
      </div>
    );
  }
}

export default Game;
