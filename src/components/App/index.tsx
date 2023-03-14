import React, {useEffect, useState} from "react";
import { generateCells, openMultipleCells } from "../../utils";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";
import { CellState, CellValue, Face } from "../../types";

import "./App.scss";
import { NO_OF_MINES } from "../../constants";

const App: React.FC = () => {
    const [cells, setCells] = useState(generateCells());
    const [face, setFace] = useState<Face>(Face.smile);
    const [time, setTime] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [live, setLive] = useState<boolean>(false);
    const [mines, setMines] = useState<number>(NO_OF_MINES);

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            setFace(Face.oh);
        };
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", () => setFace(Face.smile));

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", () => setFace(Face.smile));
        }
    }, []);

    useEffect(() => {
        if (live) {
            const timer = setInterval(() => {
                setTime(time + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [live, time]);

    const handleCellClick = (rowParam: number, colParam: number) => (): void => {
        if (!live) {
            setLive(true);
        }

        const newCells = cells.slice();
        const currentCell = cells[rowParam][colParam];

        if ([CellState.flagged, CellState.visible, CellState.question].includes(currentCell.state)) {
            return;
        }

        if (currentCell.value === CellValue.mine) {
            // TODO: handle game over
            currentCell.state = CellState.exploded;
        } else if (currentCell.value === CellValue.none) {
            // TODO: reveal all cells around
            openMultipleCells(newCells, rowParam, colParam);
        } else {
            // TODO: reveal cell
            newCells[rowParam][colParam].state = CellState.visible;
            setCells(newCells);
        }
    };

    const handleCellContext = (
        rowParam: number,
        colParam: number
    ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();

        if (!live) {
            setLive(true);
        }

        const currentCells = cells.slice();
        const currentCell = cells[rowParam][colParam];

        if (currentCell.state === CellState.visible) {
            return;
        } else if (currentCell.state === CellState.open) {
            currentCells[rowParam][colParam].state = CellState.flagged;
            if (mines > -99){
                setMines(mines - 1);
            }
        } else if (currentCell.state === CellState.flagged) {
            currentCells[rowParam][colParam].state = CellState.question;
            setMines(mines + 1);
        } else if (currentCell.state === CellState.question) {
            currentCells[rowParam][colParam].state = CellState.open;
        }            
    };
    
    const renderCells = (): React.ReactNode => {
        return cells.map((row, rowIndex) => row.map((cell, colIndex) => {
            return <Button 
                key={`${rowIndex}-${colIndex}`}
                state={cell.state}
                value={cell.value}
                row={rowIndex}
                col={colIndex}
                onClick={handleCellClick}
                onContext={handleCellContext}
            />;}
    ));}

    return (
        <div className="App">
            <div className="Header">
                <NumberDisplay value={mines} />
                <div className="Face">
                    <span role="img" arial-label="face">
                        {face}
                    </span>
                </div>
                <NumberDisplay value={time} />
            </div>
            <div className="Body">
                {renderCells()}
            </div>
        </div>
    );
};

export default App;
