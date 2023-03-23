import { useState } from "react";
import Draggable from "react-draggable";
import { logger } from "../../App";

import "./Window.scss";

interface WindowProps {
    children: JSX.Element;
    title: string;
  }

const Window: React.FC<WindowProps> = ({children, title}) => {
    logger.log(`Window oppened with: ${title}`);
    const [window, setWindow] = useState(true);

    const handleCloseWindow = () => {
        setWindow(false);
    };

    const handleMaximizeWindow = () => {
        console.log("Maximize");
    };

    const handleMinimizeWindow = () => {
        console.log("Minimize");
    };
 
    if (window) {
        return (
            <Draggable
                handle=".tw-draggable">
                <div className="tw-window" id="tw-window">
                    <div className="tw-header">
                        <div className="tw-title  tw-draggable">
                            { title }
                        </div>
                        <div className="tw-buttons">
                            <button type="button" className="tw-button tw-minimize" onClick={handleMinimizeWindow}/>
                            <button type="button" className="tw-button tw-maximize" onClick={handleMaximizeWindow}/>
                            <button type="button" className="tw-button tw-close" onClick={handleCloseWindow}/>
                        </div>
                    </div>
                    <div className="tw-body">
                        { children }
                    </div>
                </div>
            </Draggable>
        );
    } else {
        return null;
    }
};
 
export default Window;