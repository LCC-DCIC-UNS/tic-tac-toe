import { useEffect } from 'react';
import { colors, colorToCss, Grid } from './Game';
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

    function onDotDown(pos: number) {
        if (path.length === 0) {    // Clicked the first square, so init the path with that square.
            onPathChange([pos]);
        }
    }

    function onDotUp() {
        if (path.length === 1) {
            onPathChange([]);
        } else {
            onDone();
        }
    }

    function onSquareHover(pos: number) {
        if (path.length === 0) {    // Ignore square hover if not collecting a path.
            return;
        }
        if (!grid[pos].some(content => colors.includes(content))) {    // Only consider hovering squares with a dot.
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
            <div className="cells" style={{ gridTemplateColumns: `repeat(${numOfColumns}, 30px)`, gridTemplateRows: `repeat(${numOfRows}, 30px)` }}>
                {grid.map((num, pos) => {
                    return (
                        <Square
                            value={num}
                            onMouseDown={() => onDotDown(pos)}
                            onMouseUp={() => onDotUp()}
                            onMouseEnter={() => onSquareHover(pos)}                            
                            key={pos}
                        />
                    );
                })}
            </div>
            <div className="horizontalConnectors" style={{ gridTemplateColumns: `repeat(${numOfColumns - 1}, 30px)`, gridTemplateRows: `repeat(${numOfRows}, 30px)` }}>
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
                    return <Connector type={"horizontal"} color={from !== undefined ? colorToCss(grid[from].find(content => colors.includes(content))!) : undefined} key={i} />;
                })}
            </div>
            <div className="verticalConnectors" style={{ gridTemplateColumns: `repeat(${numOfColumns}, 30px)`, gridTemplateRows: `repeat(${numOfRows - 1}, 30px)` }}>
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
                    return <Connector type={"vertical"} color={from !== undefined ? colorToCss(grid[from].find(content => colors.includes(content))!) : undefined} key={i} />;
                })}
            </div>
        </div>
    );

}

export default Board;