import { CellContent, colorToCss } from "./model";
import styles from "./Cell.module.css";


interface CellProps {
    value: CellContent[];
    onMouseEnter: () => void;
    onMouseDown: () => void;
}

function Cell({ value, onMouseEnter, onMouseDown }: CellProps) {

    const content = value.map((cellContent, i) => {
        switch (cellContent) {
            case "~": return <div className={styles.water} key={i} />;
            case "-": return <div className={styles.empty} key={i} />;
            default: return (
                <button
                    className={styles.color}
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter}
                    key={i}
                >
                    <div style={{ backgroundColor: colorToCss(cellContent) }} />
                </button>
            );
        }
    });

    return (
        <div className={styles.cell}>
            {content}
        </div>
    );
}

export default Cell;