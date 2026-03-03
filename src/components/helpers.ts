import { useEffect, useState } from "react";
import { CellContent, colors, Grid, Objectives } from "./model";

export function connectionInPath(posA: number, posB: number, path: number[]): boolean {
    return path.some((pos, i) => pos === posA && i + 1 < path.length && path[i + 1] === posB);
}

export function isAdyacent(posA: number, posB: number, numOfColumns: number) {
    const posARow = Math.floor(posA / numOfColumns);
    const posACol = posA % numOfColumns;
    const posBRow = Math.floor(posB / numOfColumns);
    const posBCol = posB % numOfColumns;
    return posARow === posBRow && Math.abs(posACol - posBCol) === 1 ||
        posACol === posBCol && Math.abs(posARow - posBRow) === 1;
}

export function connectable(posA: number, posB: number, grid: Grid): boolean {
    return grid[posA].some(value => isConnectableDot(value) && grid[posB].includes(value));
}

export function isConnectableDot(value: CellContent): boolean {
    return colors.includes(value);
}

export function useHistory({ grid, objectives, waiting }: { grid: Grid, objectives: Objectives, waiting: boolean }): { grid?: Grid, objectives?: Objectives } {
    const [history, setHistory] = useState<{ grid: Grid, objectives: Objectives }[]>([]);
    const [current, setCurrent] = useState(-1);
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        if (!grid) {
            return;
        }
        setHistory(prev => prev.concat([{ grid, objectives }]));
        setCurrent(prev => prev + 1);
    }, [grid]);

    useEffect(() => {
        if (waiting) {
            setEnabled(false);
            if (history.length > 0) {
                setHistory(prev => [prev[prev.length - 1]]);
                setCurrent(0);
            }
        }
    }, [waiting]);
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (history.length === 0) {
                return;
            }
            if (e.key === "ArrowLeft") {
                setCurrent(prev => Math.max(prev - 1, 0));
                setEnabled(true);
            } else if (e.key === "ArrowRight") {
                setCurrent(prev => Math.min(prev + 1, history.length - 1));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [history, waiting]);
    return (enabled && history.length > 0 && current < history.length - 1) ? history[current] : {};
}
