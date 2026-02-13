import { useEffect } from 'react';
import { Grid } from './Game';
import Square from './Square';
import { connectable, connectionInPath, isAdyacent } from './util';
import Connector from './Connector';

interface BoardProps {
    grid: Grid;
    numOfColumns: number;
    path: number[];
    onPathChange: (path: number[]) => void;
    onDone: () => void;
}

function Board({ grid, numOfColumns, path, onPathChange, onDone }: BoardProps) {

    function onDotClick(pos: number) {
        if (path.length === 0) {    // Clicked the first square, so init the path with that square.
            onPathChange([pos]);
        } else if (path[path.length - 1] === pos) {  // Clicked the last square in the path
            if (path.length === 1) {    // If it's the only square in the path, then stop collecting the path (reset to empty).
                onPathChange([]);
            } else {                    // Otherwise, trigger the game move.
                onDone();
            }
        }
    }

    function onSquareHover(pos: number) {
        if (path.length === 0) {    // Ignore square hover if not collecting a path.
            return;
        }
        if (isAdyacent(pos, path[path.length - 1], numOfColumns)) {
            if (path.length > 1 && pos === path[path.length - 2]) {  // Remove the last square in the path if returned to the previous one
                onPathChange(path.slice(0, path.length - 1));
            } else if (!path.includes(pos) && connectable(pos, path[path.length - 1], grid)) {   // Add a square to the path if adyacent, not already in the path, and equal or next power than the last in the path
                onPathChange(path.concat([pos]));   // Add a square to the path if adyacent, not already in the path, and equal or next power than the last in the path
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", e => {
            if (e.key === "Escape") {
                onPathChange([]);
            }
        });
        // eslint-disable-next-line
    }, []);

    const numOfRows = grid.length / numOfColumns;
    return (
        <div className="board">
            <div className="squares" style={{ gridTemplateColumns: `repeat(${numOfColumns}, 80px)`, gridTemplateRows: `repeat(${numOfRows}, 80px)` }}>
                {grid.map((num, i) => {
                    const pos = [Math.floor(i / numOfColumns), i % numOfColumns];
                    return (
                        <Square
                            value={num}
                            onClick={() => onDotClick(pos)}
                            onMouseEnter={() => onSquareHover(pos)}
                            className={path.length === 0 ? "riseOnHover" : equalPos(path[path.length - 1], pos) ? "rise" : undefined}
                            key={i}
                        />
                    );
                })}
            </div>
            <div className="horizontalConnectors" style={{ gridTemplateColumns: `repeat(${numOfColumns - 1}, 80px)`, gridTemplateRows: `repeat(${numOfRows}, 80px)` }}>
                {Array.from({ length: numOfRows * (numOfColumns - 1) }, (_, i) => {
                    const row = Math.floor(i / (numOfColumns - 1));
                    const column = i % (numOfColumns - 1);
                    const posA = [row, column];
                    const posB = [row, column + 1];
                    let from;
                    if (connectionInPath(posA, posB, path)) {
                        from = posA;
                    } else if (connectionInPath(posB, posA, path)) {
                        from = posB;
                    }
                    return <Connector type={"horizontal"} color={from !== undefined ? numberToColor(grid[from[0] * numOfColumns + from[1]]) : undefined} key={i} />;
                })}
            </div>
            <div className="verticalConnectors" style={{ gridTemplateColumns: `repeat(${numOfColumns}, 80px)`, gridTemplateRows: `repeat(${numOfRows - 1}, 80px)` }}>
                {Array.from({ length: (numOfRows - 1) * numOfColumns }, (_, i) => {
                    const row = Math.floor(i / numOfColumns);
                    const column = i % numOfColumns;
                    const posA = [row, column];
                    const posB = [row + 1, column];
                    let from;
                    if (connectionInPath(posA, posB, path)) {
                        from = posA;
                    } else if (connectionInPath(posB, posA, path)) {
                        from = posB;
                    }
                    return <Connector type={"vertical"} color={from !== undefined ? numberToColor(grid[from[0] * numOfColumns + from[1]]) : undefined} key={i} />;
                })}
            </div>
        </div>
    );

}

export default Board;