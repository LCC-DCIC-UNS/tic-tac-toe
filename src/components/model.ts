export const colors = ["r", "c", "g", "p", "y"];

export function colorToCss(color: typeof colors[number]): string {
    switch (color) {
        case "r": return "#e84d60";
        case "c": return "#7bbdc9";
        case "g": return "#2cac75";
        case "p": return "#a4547d";
        case "y": return "#fecd6c";
        default: return "black";
    }
}

export type CellContent = (typeof colors[number]) | "-" | "~";

export type Grid = CellContent[][];

export type Objectives = {
  [key in CellContent]?: number;
}
