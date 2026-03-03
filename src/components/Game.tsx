import { useEffect, useState } from 'react';
import PengineClient, { PrologTerm } from '../services/PengineClient';
import Board from './Board';
import { delay } from './util';
import styles from './Game.module.css';
import { CellContent, Grid, Objectives } from './model';
import { useHistory } from './helpers';

type EffectTerm = PrologTerm & {
  functor: "effect";
  args: [Grid, EffectInfoTerm[]];
}

type EffectInfoTerm = NewBlockTerm | PrologTerm;

type NewBlockTerm = PrologTerm & {
  functor: "achieved";
  args: [CellContent, number][];
}

function Game() {
  // State
  const [pengine, setPengine] = useState<any>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [numOfColumns, setNumOfColumns] = useState<number | null>(null);
  const [objectives, setObjectives] = useState<Objectives>({});
  const [path, setPath] = useState<number[]>([]);
  const [waiting, setWaiting] = useState(false);

  const { grid: historyGrid, objectives: historyObjectives } = useHistory({ grid: grid!, objectives, waiting });

  useEffect(() => {
    // This is executed just once, after the first render.
    connectToPenginesServer();
  }, []);

  async function connectToPenginesServer() {
    setPengine(await PengineClient.create()); // Await until the server is initialized
  }

  useEffect(() => {
    if (pengine) {
      // This is executed after pengine was set.
      initGame();
    }
  }, [pengine]);


  async function initGame() {
    const queryS = 'init(Grid, NumOfColumns, Goals)';
    const response = await pengine!.query(queryS);
    setGrid(response['Grid']);
    setNumOfColumns(response['NumOfColumns']);
    const objectives: Objectives = {};
    response['Goals'].forEach(([block, value]: [CellContent, number]) => {
      objectives[block] = value;
    });
    setObjectives(objectives);
  }

  /**
   * Called while the user is drawing a path in the grid, each time the path changes.
   */
  function onPathChange(newPath: number[]) {
    // No effect if waiting.
    if (waiting) {
      return;
    }
    setPath(newPath);
    console.log(JSON.stringify(newPath));
  }

  /**
   * Called when the user finished drawing a path in the grid.
   */
  async function onPathDone() {
    /*
    Build Prolog query, which will be like:
    connect([
            [-], [r], [c], [p], [-], [-], [-], [-],	
            [c], [y], [g], [p], [r], [-], [-], [-],	
            [r], [r], [g], [y], [r], [g], [-], [-],	
            [y], [c], [-], [y], [c], [g], [g], [-],	
            [y, ~], [c, ~], [-], [g], [c, ~], [y, ~], [c, ~], [c],	
            [c, ~], [c, ~], [-], [g, ~], [c, ~], [y, ~], [c, ~], [-],	
            [c, ~], [y, ~], [g, ~], [g, ~], [c, ~], [c, ~], [-], [-],	
            [c, ~], [y, ~], [y, ~], [y, ~], [y, ~], [-], [-], [-],	
            [-], [y, ~], [y, ~], [y], [-], [-], [-], [-]
            ], 8, [21, 29, 30],
          RGrids
        ).
    */
    const gridS = JSON.stringify(grid).replaceAll('"', '');
    const pathS = JSON.stringify(path);
    const queryS = "connect(" + gridS + "," + numOfColumns + "," + pathS + ", Effects)";
    setWaiting(true);
    const response = await pengine.query(queryS);
    setPath([]);
    if (response) {
      animateEffects(response['Effects']);
    } else {
      console.log("Prolog query failed")
      setWaiting(false);
    }
  }

  /**
   * Displays each grid of the sequence as the current grid in 1sec intervals, and considers the other effect information.
   * @param effects The list of effects to be animated.
   */
  async function animateEffects(effects: EffectTerm[]) {
    applyEffect(effects[0]);
    const restEffects = effects.slice(1);
    if (restEffects.length === 0) {
      setWaiting(false);
      return;
    }
    await delay(1000);
    animateEffects(restEffects);
  }

  function applyEffect(effect: EffectTerm) {
    const [effectGrid, effectInfo] = effect.args;
    setGrid(effectGrid);
    effectInfo.forEach((effectInfoItem) => {
      const { functor, args } = effectInfoItem;
      switch (functor) {
        case 'achieved':
          setObjectives(prev => {
            const newObjectives = { ...prev };
            args[0].forEach(([block, value]: [CellContent, number]) => {
              if (newObjectives[block] === undefined) {
                return;
              }
              newObjectives[block] = Math.max(newObjectives[block]! - value, 0);
            });
            return newObjectives;
          });
          break;
        default:
          break;
      }
    });
  }

  // Don't display anything until the Prolog server is ready (alternatively render a loading UI).
  if (!pengine) {
    return null;
  }

  if (grid === null) {
    return null;
  }

  return (
    <div className={styles.game}>
      <div className={styles.header}>
        {Object.entries(historyObjectives ?? objectives).map(([key, value]) => `${key} ${value}`).join(' | ')}
      </div>
      <Board
        grid={historyGrid ?? grid}
        numOfColumns={numOfColumns!}
        path={path}
        onPathChange={onPathChange}
        onDone={onPathDone}
        readonly={waiting || historyGrid !== undefined}
      />
    </div>
  );
}

export default Game;