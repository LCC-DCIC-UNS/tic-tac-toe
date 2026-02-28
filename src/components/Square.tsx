import { CellContent, colorToCss } from "./Game";
import styles from "./Square.module.css";


interface SquareProps {
    value: CellContent[];
    onMouseEnter: () => void;
    onMouseUp: () => void;
    onMouseDown: () => void;
}

function Square({ value, onMouseEnter, onMouseUp, onMouseDown, inPath }: SquareProps) {

    function Content({ cellContent }: { cellContent: CellContent }) {
        switch (cellContent) {
            case "~": return <div className={styles.water} />;
            case "-": return <div className={styles.empty} />;
            default: return <div className={styles.color} style={{ backgroundColor: colorToCss(cellContent) }} />;
        }
    }
    return (
        <button
            className={styles.square}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
        >
            {value.map((cellContent, i) => (
                <Content cellContent={cellContent} key={i} />
            ))}
        </button>
    );
}

export default Square;