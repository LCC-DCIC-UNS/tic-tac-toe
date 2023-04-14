import React, { useEffect } from 'react';
import Square from './Square';
import Connector from './Connector';
import { valueInPos, numberToColor, connectionInPath, posInPath, isAdyacent, equalPos } from './util';

function Board({ grid, numOfColumns, path, onPathChange, onDone }) {

    function onSquareClick(pos) {
        if (path.length === 0) {    // Clicked the first square, so init the path with that square.
            onPathChange([pos]);
        } else if (equalPos(path[path.length - 1], pos)) {  // Clicked the last square in the path
            if (path.length === 1) {    // If it's the only square in the path, then stop collecting the path (reset to empty).
                onPathChange([]);
            } else {                    // Otherwise, trigger the game move.
                onDone();
            }
        }
    }

    function onSquareHover(pos) {
        if (path.length === 0) {    // Ignore square hover if not collecting a path.
            return;
        }
        if (isAdyacent(pos, path[path.length - 1])) {
            if (path.length > 1 && equalPos(pos, path[path.length - 2])) {  // Remove the last square in the path if returned to the previous one
                onPathChange(path.slice(0, path.length - 1));
            } else if (!posInPath(pos, path) &&
                (valueInPos(pos, grid, numOfColumns) === valueInPos(path[path.length - 1], grid, numOfColumns)
                    || (path.length > 1 && valueInPos(pos, grid, numOfColumns) === 2 * valueInPos(path[path.length - 1], grid, numOfColumns)))) {
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
                            onClick={() => onSquareClick(pos)}
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
            <div className="slashConnectors" style={{ gridTemplateColumns: `repeat(${numOfColumns - 1}, 80px)`, gridTemplateRows: `repeat(${numOfRows - 1}, 80px)` }}>
                {Array.from({ length: (numOfRows - 1) * (numOfColumns - 1) }, (_, i) => {
                    const row = Math.floor(i / (numOfColumns - 1));
                    const column = i % (numOfColumns - 1);
                    const posA = [row, column + 1];
                    const posB = [row + 1, column];
                    let from;
                    if (connectionInPath(posA, posB, path)) {
                        from = posA;
                    } else if (connectionInPath(posB, posA, path)) {
                        from = posB;
                    }
                    return <Connector type={"slash"} color={from !== undefined ? numberToColor(grid[from[0] * numOfColumns + from[1]]) : undefined} key={i} />;
                })}
            </div>
            <div className="backslashConnectors" style={{ gridTemplateColumns: `repeat(${numOfColumns - 1}, 80px)`, gridTemplateRows: `repeat(${numOfRows - 1}, 80px)` }}>
                {Array.from({ length: (numOfRows - 1) * (numOfColumns - 1) }, (_, i) => {
                    const row = Math.floor(i / (numOfColumns - 1));
                    const column = i % (numOfColumns - 1);
                    const posA = [row, column];
                    const posB = [row + 1, column + 1];
                    let from;
                    if (connectionInPath(posA, posB, path)) {
                        from = posA;
                    } else if (connectionInPath(posB, posA, path)) {
                        from = posB;
                    }
                    return <Connector type={"backslash"} color={from !== undefined ? numberToColor(grid[from[0] * numOfColumns + from[1]]) : undefined} key={i} />;
                })}
            </div>
        </div>
    );

}

export default Board;