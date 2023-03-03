import React from 'react';
import Square from './Square';
import Connector from './Connector';
import { valueInPos, numberToColor, connectionInPath, posInPath, isAdyacent, numOfColumns, numOfRows, equalPos } from './util';
class Board extends React.Component {

    onSquareClick(pos) {
        console.log(pos);
        const { path, onPathChange, onDone } = this.props;
        if (path.length === 0) {
            onPathChange([pos]);
        } else if (equalPos(path[path.length - 1], pos)) {
            onDone();
        }
    }

    onSquareHover(pos) {
        const { path, onPathChange, grid } = this.props;
        if (path.length === 0) {
            return;
        }
        if (isAdyacent(pos, path[path.length - 1])) {
            if (path.length > 1 && equalPos(pos, path[path.length - 2])) {
                onPathChange(path.slice(0, path.length - 1));
            } else if (!posInPath(pos, path) &&
                (valueInPos(pos, grid) === valueInPos(path[path.length - 1], grid) || valueInPos(pos, grid) === 2 * valueInPos(path[path.length - 1], grid))) {
                onPathChange(path.concat([pos]));
            }
        }
    }

    render() {
        const { grid, path } = this.props;
        return (
            <div className="board">
                <div className="squares">
                    {grid.map((num, i) => {
                        const pos = [Math.floor(i / numOfColumns), i % numOfColumns];
                        console.log(pos);
                        return <Square
                            value={num}
                            key={i}
                            onClick={() => this.onSquareClick(pos)}
                            onMouseEnter={() => this.onSquareHover(pos)} />;
                    })}
                </div>
                <div className="horizontalConnectors">
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
                        return from ?
                            <Connector type={"horizontal"} color={numberToColor(grid[from[0] * numOfColumns + from[1]])} key={i} />
                            :
                            <div key={i} />;
                    })}
                </div>
                <div className="verticalConnectors">
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
                        return from ?
                            <Connector type={"vertical"} color={numberToColor(grid[from[0] * numOfColumns + from[1]])} key={i} />
                            :
                            <div key={i} />;
                    })}
                </div>
                <div className="slashConnectors">
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
                        return from ?
                            <Connector type={"slash"} color={numberToColor(grid[from[0] * numOfColumns + from[1]])} key={i} />
                            :
                            <div key={i} />;
                    })}
                </div>
                <div className="backslashConnectors">
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
                        return from ?
                            <Connector type={"backslash"} color={numberToColor(grid[from[0] * numOfColumns + from[1]])} key={i} />
                            :
                            <div key={i} />;
                    })}
                </div>
            </div>
        );
    }
}

export default Board;