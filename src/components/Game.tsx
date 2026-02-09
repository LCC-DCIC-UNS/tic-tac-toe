import { useEffect, useState } from 'react';
import PengineClient from '../services/PengineClient';
import Board from './Board';

function Game() {

  // State
  const [pengine, setPengine] = useState<any>(null);
  const [xIsNext, setXIsNext] = useState<boolean>(true); // records if it's the turn of X.
  const [squares, setSquares] = useState<string[]>(Array(9).fill('-')); // the current game configuration as an array of 9 values: 'X', 'O', '-'.
  const [status, setStatus] = useState<'?' | 'T' | 'X' | 'O'>('?');  // the current game status, and takes 4 possible values: '?' (in progress), 'T' (tie), 'X' (X won), 'O' (O won).
  const [waiting, setWaiting] = useState<boolean>(false);  // records if we (did a request and) are waiting for a server response.

  useEffect(() => {
    // This is executed just once, after the first render.
    connectToPenginesServer();
  }, []);

  async function connectToPenginesServer() {
    setPengine(await PengineClient.create()); // Await until the server is initialized
  }

  async function handleSquareClick(i: number) {
    if (status !== '?' || waiting) {
      return;
    }
    // Build Prolog query to make a move and get the updated game status.    
    const squaresS = JSON.stringify(squares);  // squaresS = '["-", "-", "-", "-", "-", "-", "-", "-", "-"]'
    const player = xIsNext ? 'X' : 'O';   // playerS = 'X' or 'O'
    const queryS = `put("${player}", ${i}, ${squaresS}, BoardRes), gameStatus(BoardRes, Status)`;  // queryS = 'put("X", 0, ["-", "-", "-", "-", "-", "-", "-", "-", "-"], BoardRes), gameStatus(BoardRes, Status)'        
    setWaiting(true);
    const response = await pengine!.query(queryS);
    if (response) {
      setSquares(response['BoardRes']);
      setXIsNext(!xIsNext);
      setStatus(response['Status']);
    }
    setWaiting(false);
  }

  // Don't display anything until the Prolog server is ready (alternatively render a loading UI).
  if (!pengine) {
    return null;
  }

  let statusText: string;
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