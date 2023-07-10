import { useState } from "react";
import Draggable from "react-draggable";
import { logger } from "../../../../Main";

import "./Window.scss";

export interface WindowProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
    title: string;
  }

  const Window: React.FC<WindowProps> = ({ children, onClose, isOpen, title }) => {
  
    const handleCloseWindow = () => {
      onClose();
    };
  
    const handleMaximizeWindow = () => {
      console.log("Maximize");
    };
  
    const handleMinimizeWindow = () => {
      console.log("Minimize");
    };
  
    if (isOpen) {
      return (
        <Draggable handle=".tw-draggable">
          <div className="tw-window" id="tw-window">
            <div className="tw-header">
              <div className="tw-title  tw-draggable">{title}</div>
              <div className="tw-buttons">
                <button type="button" className="tw-button tw-minimize" onClick={handleMinimizeWindow} />
                <button type="button" className="tw-button tw-maximize" onClick={handleMaximizeWindow} />
                <button type="button" className="tw-button tw-close" onClick={handleCloseWindow} />
              </div>
            </div>
            <div className="tw-body">{children}</div>
          </div>
        </Draggable>
      );
    } else {
      return null;
    }
  };
  
  export default Window;