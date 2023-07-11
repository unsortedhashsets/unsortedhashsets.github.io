import React, { useState } from 'react';
import Draggable from 'react-draggable';

import './Window.scss';

interface WindowProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  handleZIndexChange: (newValue: number) => void;
  windowsZIndex: number;
}

const Window: React.FC<WindowProps> = ({
  children,
  onClose,
  isOpen,
  title,
  handleZIndexChange,
  windowsZIndex,
}) => {
  const [currentZIndex, setCurrentZIndex] = useState(windowsZIndex - 1);

  const onMouseDown = () => {
    if (currentZIndex === windowsZIndex) {
      return;
    } else if (currentZIndex > windowsZIndex) {
      setCurrentZIndex(windowsZIndex);
    } else {
      handleZIndexChange(windowsZIndex + 1);
      setCurrentZIndex(windowsZIndex + 1);
    }
  };

  const handleCloseWindow = () => {
    onClose();
  };

  const handleMaximizeWindow = () => {
    console.log('Maximize');
  };

  const handleMinimizeWindow = () => {
    console.log('Minimize');
  };

  return isOpen ? (
    <Draggable handle='.tw-draggable' onMouseDown={onMouseDown}>
      <div
        className='tw-window'
        id={`tw-window-${title}`}
        style={{ zIndex: currentZIndex }}
      >
        <div className='tw-header'>
          <div className='tw-title tw-draggable'>{title}</div>
          <div className='tw-buttons'>
            <button
              type='button'
              className='tw-button tw-minimize'
              onClick={handleMinimizeWindow}
            />
            <button
              type='button'
              className='tw-button tw-maximize'
              onClick={handleMaximizeWindow}
            />
            <button
              type='button'
              className='tw-button tw-close'
              onClick={handleCloseWindow}
            />
          </div>
        </div>
        <div className='tw-body'>{children}</div>
      </div>
    </Draggable>
  ) : null;
};

export default Window;
