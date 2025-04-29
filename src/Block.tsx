import { numberToColor } from './util';

function Block({ value, position }) {
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