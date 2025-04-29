import { numberToColor } from './util';

export type Position = [number, number];
interface BlockProps {
    value: number;
    position: Position;
}

function Block({ value, position }: BlockProps) {
    const [row, column] = position;
    return (
        <div
            className="block"
            style={{ backgroundColor: numberToColor(value), gridRow: row + 1, gridColumn: column + 1 }}
        >
            {value === 0 ? "" : value}
        </div>
    );
}

export default Block;