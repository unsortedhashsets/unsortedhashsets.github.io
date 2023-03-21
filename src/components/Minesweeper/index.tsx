import React, {useEffect, useState} from "react";
import { disableAllCells, flagUnsafeCells, generateCells, openMultipleCells, showAllMines } from "../../components/Minesweeper/utils";
import Button from "./Button";
import NumberDisplay from "./NumberDisplay";
import { CellState, CellValue, Face } from "./types";

import "./Minesweeper.scss";
import { NO_OF_MINES } from "./constants";

const Minesweeper: React.FC = () => {
    const [cells, setCells] = useState(generateCells());
    const [face, setFace] = useState<Face>(Face.smile);
    const [time, setTime] = useState<number>(0);
    const [live, setLive] = useState<boolean>(false);
    const [mines, setMines] = useState<number>(NO_OF_MINES);
    const [hasLost, setHasLost] = useState<boolean>(false);
    const [hasWon, setHasWon] = useState<boolean>(false);

    useEffect(() => {
        if (!hasLost && !hasWon) {
            const handleMouseDown = (): void => {
                setFace(Face.oh);
            };
        
            const handleMouseUp = (): void => {
                setFace(Face.smile);
            };
            // add event listener to buttons find by class Button
            const Body = document.getElementsByClassName("ms-body")[0];

            Body.addEventListener("mouseover", handleMouseDown);
            Body.addEventListener("mouseout", handleMouseUp);
        
            return () => {
                Body.removeEventListener("mouseover", handleMouseDown);
                Body.removeEventListener("mouseout", handleMouseUp);
            };
        }
      }, [hasLost, hasWon]);

    useEffect(() => {
        if (live) {
            if (time === 999) {
                return;
            } else {
                const timer = setInterval(() => {
                    setTime(time + 1);
                }, 1000);
                return () => clearInterval(timer);
            }
        }
    }, [live, time]);

    useEffect(() => {
        if (hasLost) {
            setLive(false);
            setFace(Face.lost);
        }
    }, [hasLost]);

    useEffect(() => {
        if (hasWon) {
            setLive(false);
            setFace(Face.won);
        }
    }, [hasWon]);

    const handleFaceClick = (): void => {
        setLive(false);
        setTime(0);
        setCells(generateCells());
        setHasLost(false);
        setHasWon(false);
        setMines(NO_OF_MINES);
        setFace(Face.smile);
    };

    const handleCellClick = (rowParam: number, colParam: number) => (): void => {
        if (hasLost || hasWon) {
            return;
        }

        if (!live) {
            setLive(true);
        }

        let newCells = cells.slice();
        const currentCell = cells[rowParam][colParam];

        if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
            return;
        }

        if (currentCell.value === CellValue.mine) {
            currentCell.state = CellState.exploded;
            newCells[rowParam][colParam].red = true;
            setCells(showAllMines(newCells));
            setHasLost(true);
            setCells(disableAllCells(newCells));
            return;
        } else if (currentCell.value === CellValue.none) {
            openMultipleCells(newCells, rowParam, colParam);
        } else {
            newCells[rowParam][colParam].state = CellState.visible;
            newCells[rowParam][colParam].enabled = false;
            setCells(newCells);
        }

        let safeOpenCellsExist = false;
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                if (cells[i][j].value !== CellValue.mine && cells[i][j].state === CellState.open) {
                    safeOpenCellsExist = true;
                    break;
                }
            }
        }

        if (!safeOpenCellsExist) {
            setHasWon(true);
            setCells(flagUnsafeCells(newCells));
            setMines(0);
            setCells(disableAllCells(newCells));
        }
    };

    const handleCellContext = (
        rowParam: number,
        colParam: number
    ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();

        if (hasLost || hasWon) {
            return;
        }
        
        if (!live) {
            setLive(true);
        }

        const currentCells = cells.slice();
        const currentCell = cells[rowParam][colParam];

        if (currentCell.state === CellState.visible) {
            return;
        } else if (currentCell.state === CellState.open) {
            currentCells[rowParam][colParam].state = CellState.flagged;
            currentCells[rowParam][colParam].enabled = false;
            if (mines > -99){
                setMines(mines - 1);
            }
            
        } else if (currentCell.state === CellState.flagged) {
            setMines(mines + 1);
            currentCells[rowParam][colParam].state = CellState.open;
            currentCells[rowParam][colParam].enabled = true;
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
                red={cell.red}
                enabled={cell.enabled}
                onClick={handleCellClick}
                onContext={handleCellContext}
            />;}
    ));}
        
    return (
        <div className="ms-app">
            <div className="ms-header">
                <NumberDisplay value={mines} />
                <div className="ms-face">
                    <span role="img" arial-label="face" onClick={handleFaceClick}>
                        {face}
                    </span>
                </div>
                <NumberDisplay value={time} />
            </div>
            <div className="ms-body">
                {renderCells()}
            </div>
        </div>
    );
};

export default Minesweeper;
