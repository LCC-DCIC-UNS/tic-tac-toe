import Block from './Block';

function Board({ grid, numOfColumns, onLaneClick }) {

    const numOfRows = grid.length / numOfColumns;
    return (
        <div className="board">
            <div className="blocks" style={{ gridTemplateColumns: `repeat(${numOfColumns}, 70px)`, gridTemplateRows: `repeat(${numOfRows}, 70px)` }}>
                {Array.from({ length: numOfColumns }).map((_, i) => (
                    <div
                        className='lane'
                        style={{ gridColumn: i + 1, gridRow: `1 / span ${numOfRows}` }}
                        onClick={() => onLaneClick(i + 1)}
                        key={i}
                    />
                ))}
                {grid.map((num, i) => {
                    if (num === "-") {
                        return null;
                    }
                    const pos = [Math.floor(i / numOfColumns), i % numOfColumns];
                    return (
                        <Block
                            value={num}
                            position={pos}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Board;