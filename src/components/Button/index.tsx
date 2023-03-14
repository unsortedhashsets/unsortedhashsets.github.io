import React from "react";
import { CellState, CellValue } from "../../types";

import "./Button.scss";

interface ButtonProps {
    row: number;
    col: number;
    state: CellState;
    value: CellValue;
}

const Button: React.FC<ButtonProps> = ( {row, col, state, value}) => {
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
        }
    }

    return (
        <div className={`Button ${state === CellState.visible ? "visible" : ""} value-${value}`}>
                {renderContent()}
        </div>
    );
};

export default Button;