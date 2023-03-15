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
    flagged,
    question,
    exploded
}

export type Cell = {
    enabled: boolean; value: CellValue; state: CellState; row: number; col: number; red?: boolean
};

export enum Face {
    smile = '🙂',
    oh = '😲',
    lost = '🤡',
    won = '😻'
}