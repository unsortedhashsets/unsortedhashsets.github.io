import React, {useState} from "react";
import { generateCells } from "../../utils";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";

import "./App.scss";

const App: React.FC = () => {
    const [cells, setCells] = useState(generateCells);


    function renderCells(): React.ReactNode {
        return cells.map((row, rowIndex) => row.map((cell, colIndex) => {
            return <Button key={`${rowIndex}-${colIndex}`} state={cell.state} value={cell.value} row={rowIndex} col={colIndex} />;}
    ));}

    return (
        <div className="App">
            <div className="Header">
                <NumberDisplay value={0} />
                <div className="Face">
                    <span role="img" arial-label="face">
                        🤔
                    </span>
                </div>
                <NumberDisplay value={23} />
            </div>
            <div className="Body">
                {renderCells()}
            </div>
        </div>
    );
};

export default App;
