import { MAX_ROWS, MAX_COLS, NO_OF_MINES } from "../constants";
import { CellState, CellValue, Cell } from "../types";

export const generateCells = () => {
    let cells: Cell[][] = [];
    for (let row = 0; row < MAX_ROWS; row++) {
        cells.push([]);
        for (let col = 0; col < MAX_COLS; col++) {
            cells[row].push({
                value: CellValue.none,
                state: CellState.open,
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
            const topLeft = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1].value : null;
            const top = rowIndex > 0 ? cells[rowIndex - 1][colIndex].value : null;
            const topRight = rowIndex > 0 && colIndex < MAX_COLS - 1 ? cells[rowIndex - 1][colIndex + 1].value : null;
            const left = colIndex > 0 ? cells[rowIndex][colIndex - 1].value : null;
            const right = colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex + 1].value : null;
            const bottomLeft = rowIndex < MAX_ROWS - 1 && colIndex > 0 ? cells[rowIndex + 1][colIndex - 1].value : null;
            const bottom = rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex].value : null;
            const bottomRight = rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1 ? cells[rowIndex + 1][colIndex + 1].value : null;

            if (topLeft === CellValue.mine) mineCount++;
            if (top === CellValue.mine) mineCount++;
            if (topRight === CellValue.mine) mineCount++;
            if (left === CellValue.mine) mineCount++;
            if (right === CellValue.mine) mineCount++;
            if (bottomLeft === CellValue.mine) mineCount++;
            if (bottom === CellValue.mine) mineCount++;
            if (bottomRight === CellValue.mine) mineCount++;

            cells[rowIndex][colIndex].value = mineCount as CellValue;
        }
    };
    return cells;
};