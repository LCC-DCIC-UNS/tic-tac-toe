import React, { useEffect } from 'react';
import { colors, colorToCss, Grid } from './model';
import Cell from './Cell';
import { connectable, connectionInPath, isAdyacent } from './helpers';
import Connector from './Connector';
import styles from './Board.module.css';

interface BoardProps {
    grid: Grid;
    numOfColumns: number;
    path: number[];
    onPathChange: (path: number[]) => void;
    onDone: () => void;
    readonly?: boolean;
}

function Board({ grid, numOfColumns, path, onPathChange, onDone, readonly }: BoardProps) {

    function onDotDown(pos: number) {
        if (readonly) {
            return;
        }
        if (path.length === 0) {    // Clicked the first square, so init the path with that square.
            onPathChange([pos]);
        }
    }

    function onDotHover(pos: number) {
        if (path.length === 0) {    // Ignore if not collecting a path.
            return;
        }
        if (!grid[pos].some(content => colors.includes(content))) {    // Ignore hovering squares with no dot. TODO: replace by isDot function.
            return;
        }
        if (!isAdyacent(pos, path[path.length - 1], numOfColumns)) { // Ignore hovering non-adyacent squares.
            return;
        }
        if (path.length > 1 && pos === path[path.length - 2]) {  // Remove the last square in the path if returned to the previous one                
            onPathChange(path.slice(0, path.length - 1));
        } else if (path.length > 2 && path.slice(0, path.length - 2).includes(path[path.length - 1])) { // Ignore hovering a square if you already got a closed path
            return;
        } else if (connectable(pos, path[path.length - 1], grid)) {   // Add a square to the path if adyacent, not already in the path, and equal or next power than the last in the path
            onPathChange(path.concat([pos]));   // Add a square to the path if adyacent, not already in the path, and equal or next power than the last in the path                
        }
    }

    useEffect(() => {
        function onUp() {
            if (path.length === 0) return;  // Ignore if not collecting a path.
            if (path.length === 1) {
                onPathChange([]);
            } else {
                onDone();
            }
        }
        window.addEventListener("mouseup", onUp);
        return () => window.removeEventListener("mouseup", onUp);
    }, [path, onPathChange, onDone]);

    useEffect(() => {
        window.addEventListener("keydown", e => {
            if (e.key === "Escape") {
                onPathChange([]);
            }
        });
    }, []);

    const numOfRows = grid.length / numOfColumns;
    return (
        <div className={styles.board} style={{ '--num-columns': numOfColumns, '--num-rows': numOfRows } as React.CSSProperties}>
            <div className={styles.cells}>
                {grid.map((cell, pos) => {
                    return (
                        <Cell
                            value={cell}
                            onMouseDown={() => onDotDown(pos)}
                            onMouseEnter={() => onDotHover(pos)}
                            key={pos}
                        />
                    );
                })}
            </div>
            <div className={styles.horizontalConnectors}>
                {Array.from({ length: numOfRows * (numOfColumns - 1) }, (_, i) => {
                    const row = Math.floor(i / (numOfColumns - 1));
                    const column = i % (numOfColumns - 1);
                    const posA = row * numOfColumns + column;
                    const posB = posA + 1;
                    let from;
                    if (connectionInPath(posA, posB, path)) {
                        from = posA;
                    } else if (connectionInPath(posB, posA, path)) {
                        from = posB;
                    }
                    return (
                        <Connector
                            type={"horizontal"}
                            color={from !== undefined ? colorToCss(grid[from].find(content => colors.includes(content))!) : undefined}
                            key={i}
                        />
                    );
                })}
            </div>
            <div className={styles.verticalConnectors}>
                {Array.from({ length: (numOfRows - 1) * numOfColumns }, (_, i) => {
                    const row = Math.floor(i / numOfColumns);
                    const column = i % numOfColumns;
                    const posA = row * numOfColumns + column;
                    const posB = (row + 1) * numOfColumns + column;
                    let from;
                    if (connectionInPath(posA, posB, path)) {
                        from = posA;
                    } else if (connectionInPath(posB, posA, path)) {
                        from = posB;
                    }
                    return (
                        <Connector
                            type={"vertical"}
                            color={from !== undefined ? colorToCss(grid[from].find(content => colors.includes(content))!) : undefined}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );

}

export default Board;