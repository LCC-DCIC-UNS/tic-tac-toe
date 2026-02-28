import { useEffect, useState } from 'react';
import PengineClient, { PrologTerm } from '../services/PengineClient';
import Board from './Board';
import { delay } from './util';

export const colors = ["r", "c", "v", "p", "a"];

export function colorToCss(color: typeof colors[number]): string {
  switch (color) {
    case "r": return "#e84d60";
    case "c": return "#7bbdc9";
    case "v": return "#2cac75";
    case "p": return "#a4547d";
    case "a": return "#fecd6c";
    default: return "black";
  }
}

export type CellContent = (typeof colors[number]) | "-" | "~";

export type Grid = CellContent[][];

type EffectTerm = PrologTerm & {
  functor: "effect";
  args: [Grid, EffectInfoTerm[]];
}

type EffectInfoTerm = NewBlockTerm | PrologTerm;

type NewBlockTerm = PrologTerm & {
  functor: "achieved";
  args: [CellContent, number][];
}

type Objectives = {
  [key in CellContent]?: number;
}

function Game() {
  // State
  const [pengine, setPengine] = useState<any>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [numOfColumns, setNumOfColumns] = useState<number | null>(null);
  const [objectives, setObjectives] = useState<Objectives>({});
  const [path, setPath] = useState<number[]>([]);
  const [waiting, setWaiting] = useState(false);

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
    setObjectives(response['Goals']);
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
    const gridS = JSON.stringify(grid);
    const pathS = JSON.stringify(path);
    const queryS = "connect(" + gridS + "," + numOfColumns + "," + pathS + ", Effects)";
    setWaiting(true);
    const response = await pengine.query(queryS);
    if (response) {
      setPath([]);
      animateEffect(response['Effects']);
    } else {
      setWaiting(false);
    }
  }

  /**
   * Displays each grid of the sequence as the current grid in 1sec intervals, and considers the other effect information.
   * @param effects The list of effects to be animated.
   */
  async function animateEffect(effects: EffectTerm[]) {
    const effect = effects[0];
    const [effectGrid, effectInfo] = effect.args;
    setGrid(effectGrid);
    effectInfo.forEach((effectInfoItem) => {
      const { functor, args } = effectInfoItem;
      switch (functor) {
        case 'achieved':
          setObjectives(prev => {
            const newObjectives = { ...prev };
            args.forEach(([block, value]: [CellContent, number]) => {
              newObjectives[block] = value;
            });
            return newObjectives;
          });
          break;
        default:
          break;
      }
    });
    const restEffects = effects.slice(1);
    if (restEffects.length === 0) {
      setWaiting(false);
      return;
    }
    await delay(1000);
    animateEffect(restEffects);
  }

  // Don't display anything until the Prolog server is ready (alternatively render a loading UI).
  if (!pengine) {
    return null;
  }

  if (grid === null) {
    return null;
  }

  return (
    <div className="game">
      <Board
        grid={grid}
        numOfColumns={numOfColumns!}
        path={path}
        onPathChange={onPathChange}
        onDone={onPathDone}
      />
    </div>
  );
}

export default Game;