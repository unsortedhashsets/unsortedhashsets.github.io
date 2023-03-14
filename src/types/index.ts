export enum CellValue {
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    mine,
    flagged
}


export enum CellState {
    open,
    visible,
    flagged
}

export type Cell = { value: CellValue; state: CellState; };
