import React, { useEffect, useState } from 'react';
import PengineClient from './PengineClient';
import Board from './Board';

let pengine;

function Game() {

  // State
  const [xIsNext, setXIsNext] = useState(true); // records if it's the turn of X.
  const [squares, setSquares] = useState(Array(9).fill('-')); // the current game configuration as an array of 9 values: 'X', 'O', '-'.
  const [status, setStatus] = useState('?');  // the current game status, and takes 4 possible values: '?' (in progress), 'T' (tie), 'X' (X won), 'O' (O won).
  const [waiting, setWaiting] = useState(false);  // records if we (did a request and) are waiting for a server response.

  useEffect(() => {
    // Creation of the pengine server instance.    
    // This is executed just once, after the first render.    
    // The callback will run when the server is ready, and it stores the pengine instance in the pengine variable. 
    PengineClient.init(instance => pengine = instance);
  }, []);

  function handleSquareClick(i) {
    if (status !== '?' || waiting) {
      return;
    }
    // Build Prolog query to make a move and get the updated game status.    
    const squaresS = JSON.stringify(squares);  // squaresS = '["-", "-", "-", "-", "-", "-", "-", "-", "-"]'
    const player = xIsNext ? 'X' : 'O';   // playerS = 'X' or 'O'
    const queryS = `put("${player}", ${i}, ${squaresS}, BoardRes), gameStatus(BoardRes, Status)`;  // queryS = 'put("X", 0, ["-", "-", "-", "-", "-", "-", "-", "-", "-"], BoardRes), gameStatus(BoardRes, Status)'        
    setWaiting(true);
    pengine.query(queryS, (success, response) => {
      if (success) {  // Prolog query will fail when the user clicked on a non empty cell.
        setSquares(response['BoardRes']);
        setXIsNext(!xIsNext);
        setStatus(response['Status']);
      }
      setWaiting(false);
    });
  }

  let statusText;
  if (status === '?') {
    statusText = 'Next player: ' + (xIsNext ? 'X' : 'O');
  } else if (status === 'T') {
    statusText = 'Tie!'
  } else {
    statusText = 'Winner: ' + status;
  }
  return (
    <div className="game">
      <Board squares={squares} onSquareClick={i => handleSquareClick(i)} />
      <div className="game-info">
        {statusText}
      </div>
    </div>
  );
}

export default Game;