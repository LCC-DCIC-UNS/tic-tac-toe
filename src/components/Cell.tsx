import { CellContent, colorToCss } from "./Game";
import styles from "./Cell.module.css";


interface CellProps {
    value: CellContent[];
    onMouseEnter: () => void;
    onMouseUp: () => void;
    onMouseDown: () => void;
}

function Cell({ value, onMouseEnter, onMouseUp, onMouseDown }: CellProps) {

    function Content({ cellContent }: { cellContent: CellContent }) {
        switch (cellContent) {
            case "~": return <div className={styles.water} />;
            case "-": return <div className={styles.empty} />;
            default: return <div className={styles.color} style={{ backgroundColor: colorToCss(cellContent) }} />;
        }
    }
    return (
        <button
            className={styles.cell}
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

export default Cell;