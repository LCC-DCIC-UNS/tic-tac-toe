import Square from './Square';

interface BoardProps {
    squares: string[];
    onSquareClick: (i: number) => void;
}

function Board({ squares, onSquareClick }: BoardProps) {
    return (
        <div className="board">
            {squares.map((square, i) =>
                <Square
                    value={square}
                    onClick={() => onSquareClick(i)}
                    key={i}
                />
            )}
        </div>
    );
}

export default Board;