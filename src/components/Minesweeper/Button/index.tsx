import React from "react";
import { CellState, CellValue } from "../types";

import "./Button.scss";

interface ButtonProps {
    row: number;
    col: number;
    state: CellState;
    value: CellValue;
    red?: boolean;
    enabled: boolean
    onClick(row: number, col: number): (...args: any[])  => void;
    onContext(row: number, col: number): (...args: any[])  => void;
}

const Button: React.FC<ButtonProps> = ( {row, col, onClick, onContext, red, enabled, state, value}) => {
    function renderContent(): React.ReactNode {
        if (state === CellState.visible) {
            if (value === CellValue.mine) {
                return <span role="img" aria-label="bomb">💣</span>;
            } else if (value === CellValue.none) {
                return null;
            } else {
                return value
            }
        } else if (state === CellState.flagged) {
            return <span role="img" aria-label="flag">🚩</span>;
        } else if (state === CellState.exploded) {
            return <span role="img" aria-label="exploded">💥</span>;
        } else {
            return null;
        }
    }

    return (
        <div 
            className={`Button ${state === CellState.visible ? "visible" : ""} value-${value} ${red ? "red" : ""} ${enabled === true ? "enabled" : ""}`}
            onClick={onClick(row, col)}
            onContextMenu={onContext(row, col)}
            >
                {renderContent()}
        </div>
    );
};

export default Button;