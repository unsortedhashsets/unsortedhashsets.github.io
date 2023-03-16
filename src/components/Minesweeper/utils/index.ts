import { MAX_ROWS, MAX_COLS, NO_OF_MINES } from "../constants";
import { CellState, CellValue, Cell } from "../types";

const getNeighborCells = (cells: Cell[][], rowParam: number, colParam: number) => {
    const neighbours: Cell[] = [];
    const topLeft = rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
    const top = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
    const topRight = rowParam > 0 && colParam < MAX_COLS - 1 ? cells[rowParam - 1][colParam + 1] : null;
    const left = colParam > 0 ? cells[rowParam][colParam - 1] : null;
    const right = colParam < MAX_COLS - 1 ? cells[rowParam][colParam + 1] : null;
    const bottomLeft = rowParam < MAX_ROWS - 1 && colParam > 0 ? cells[rowParam + 1][colParam - 1] : null;
    const bottom = rowParam < MAX_ROWS - 1 ? cells[rowParam + 1][colParam] : null;
    const bottomRight = rowParam < MAX_ROWS - 1 && colParam < MAX_COLS - 1 ? cells[rowParam + 1][colParam + 1] : null;

    if (topLeft) neighbours.push(topLeft);
    if (top) neighbours.push(top);
    if (topRight) neighbours.push(topRight);
    if (left) neighbours.push(left);
    if (right) neighbours.push(right);
    if (bottomLeft) neighbours.push(bottomLeft);
    if (bottom) neighbours.push(bottom);
    if (bottomRight) neighbours.push(bottomRight);

    return neighbours;
};

export const generateCells = () => {
    let cells: Cell[][] = [];
    for (let row = 0; row < MAX_ROWS; row++) {
        cells.push([]);
        for (let col = 0; col < MAX_COLS; col++) {
            cells[row].push({
                value: CellValue.none,
                state: CellState.open,
                row,
                col,
                enabled: true,
            });
        }
    }

    let minesPlaced = 0;
    while (minesPlaced < NO_OF_MINES) {
        const randomRow = Math.floor(Math.random() * MAX_ROWS);
        const randomCol = Math.floor(Math.random() * MAX_COLS);
        let currentCell = cells[randomRow][randomCol].value;
        if (currentCell !== CellValue.mine) {
            cells = cells.map((row, rowIndex) => row.map((cell, colIndex) => {
                if (rowIndex === randomRow && colIndex === randomCol) {
                    return {
                        ...cell,
                        value: CellValue.mine,
                    };
                }
                return cell;
            }));
            minesPlaced++;
        }
    };

    for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
        for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
            if (cells[rowIndex][colIndex].value === CellValue.mine) {
                continue;
            }

            let mineCount = 0;
            const neighbours = getNeighborCells(cells, rowIndex, colIndex);
            neighbours.forEach(neighbour => {
                if (neighbour.value === CellValue.mine) mineCount++;
            });

            cells[rowIndex][colIndex].value = mineCount as CellValue;
        }
    };
    return cells;
};

export const openMultipleCells = (cells: Cell[][], rowParam: number, colParam: number) => {
    const currentCell = cells[rowParam][colParam];
    let newCells = cells.slice();
    newCells[rowParam][colParam].state = CellState.visible;
    newCells[rowParam][colParam].enabled = false;

    if (currentCell.value !== CellValue.none) return cells;

    const neighbours = getNeighborCells(newCells, rowParam, colParam);
    neighbours.forEach(neighbor => {
        if (neighbor.state === CellState.open && neighbor.value !== CellValue.mine) {
            newCells = openMultipleCells(newCells, neighbor.row, neighbor.col);
        }
    });

    return newCells;
}

export const disableAllCells = (cells: Cell[][]) => {
    let newCells = cells.slice();
    newCells = newCells.map(row => row.map(cell => {
        return {
            ...cell,
            enabled: false,
        };
    }));
    return newCells;
}

export const showAllMines = (cells: Cell[][]) => {
    const newCells = cells.slice();
    newCells.forEach(row => row.forEach(cell => {
        if (cell.value === CellValue.mine && cell.state !== CellState.exploded) {
            cell.state = CellState.visible;
        }
    }));
    return newCells;
};

export const flagUnsafeCells = (cells: Cell[][]) => {
    const newCells = cells.slice();
    newCells.forEach(row => row.forEach(cell => {
        if (cell.value === CellValue.mine && cell.state !== CellState.flagged) {
            cell.state = CellState.flagged;
        }
    }));
    return newCells;
};
