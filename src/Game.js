import React, { useEffect, useState } from 'react';
import PengineClient from './PengineClient';
import Board from './Board';
import Block from './Block';

let pengine;

function Game() {

  // State
  const [grid, setGrid] = useState(null);
  const [numOfColumns, setNumOfColumns] = useState(null);
  const [score, setScore] = useState(0);
  const [shootBlock, setShootBlock] = useState(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    // This is executed just once, after the first render.
    PengineClient.init(onServerReady);
  }, []);

  /**
   * Called when the server was successfully initialized
   */
  function onServerReady(instance) {
    pengine = instance;
    const queryS = 'init(Grid, NumOfColumns), randomBlock(Grid, Block)';
    pengine.query(queryS, (success, response) => {
      if (success) {
        setGrid(response['Grid']);
        setShootBlock(response['Block']);
        setNumOfColumns(response['NumOfColumns']);
      }
    });
  }

  /**
   * Called when the player clicks on a lane.
   */
  function handleLaneClick(lane) {
    // No effect if waiting.
    if (waiting) {
      return;
    }
    /*
    Build Prolog query, which will be like:
    join([
          64,4,64,32,16,
          64,8,16,2,32,
          2,4,64,64,2,
          2,4,32,16,4,
          16,4,16,16,16,
          16,64,2,32,32,
          64,2,64,32,64,
          32,2,64,32,4
          ], 
          5, 
          [[2, 0], [3, 0], [4, 1], [3, 1], [2, 1], [1, 1], [1, 2], [0, 3]],
          RGrids
        ).
    */
    const gridS = JSON.stringify(grid).replace(/"/g, '');
    // TODO: actually need to calculate random block from the result grid, in case the range changes.
    const queryS = `shoot(${shootBlock}, ${lane}, ${gridS}, ${numOfColumns}, Effects), randomBlock(${gridS}, Block)`;
    setWaiting(true);
    pengine.query(queryS, (success, response) => {
      if (success) {
        // setScore(score + joinResult(path, grid, numOfColumns));        
        animateEffect(response['Effects']);
        setShootBlock(response['Block']);
      } else {
        setWaiting(false);
      }
    });
  }

  /**
   * Displays each grid of the sequence as the current grid in 1sec intervals.
   * @param {number[][]} effects a sequence of grids.
   */
  function animateEffect(effects) {
    const effect = effects[0];
    const { functor, args } = effect;
    const [effectGrid, otherEffects] = args;
    setGrid(effectGrid);
    const restRGrids = effects.slice(1);
    if (restRGrids.length > 0) {
      setTimeout(() => {
        animateEffect(restRGrids);
      }, 1000);
    } else {
      setWaiting(false);
    }
  }

  if (grid === null) {
    return null;
  }
  return (
    <div className="game">
      <div className="header">
        <div className="score">{score}</div>
      </div>
      <Board
        grid={grid}
        numOfColumns={numOfColumns}
        onLaneClick={handleLaneClick}
      />
      <div className='footer'>
        <div className='blockShoot'>
          <Block value={shootBlock} position={[0, 0]} />
        </div>
      </div>
    </div>
  );
}

export default Game;