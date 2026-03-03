import { CellContent, colors, Grid } from "./model";

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
