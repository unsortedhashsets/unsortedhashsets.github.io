import React, { useState } from 'react';
import './Desktop.scss';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import { AppProps } from './components/App';
import { logger } from '../../Main';

interface DesktopProps {
  children: React.ReactElement<AppProps>[];
}

export const ZIndex = 100;

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const [windowsZIndex, setWindowsZIndex] = useState<number>(ZIndex);
  const [isWindowOpen, setWindowOpen] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleZIndexChange = (newValue: number) => {
    setWindowsZIndex(newValue);
  };

  const updateStateValue = (index: number, value: boolean) => {
    setWindowOpen((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleIconDoubleClick = (
    child: React.ReactElement<AppProps>,
    index: number
  ) => {
    updateStateValue(index, true);
    logger.log(`Window opened with: ${child.props.title}-${index}`);
  };

  const handleCloseWindow = (
    child: React.ReactElement<AppProps>,
    index: number
  ) => {
    updateStateValue(index, false);
    logger.log(`Window closed with: ${child.props.title}-${index}`);
  };

  return (
    <div className='Desktop'>
      <div className='DesktopGrid'>
        {children.map((child, index) => (
          <div key={index}>
            {isWindowOpen[index] && (
              <Window
                children={child}
                onClose={() => handleCloseWindow(child, index)}
                isOpen={isWindowOpen[index]}
                title={child.props.title}
                windowsZIndex={windowsZIndex}
                handleZIndexChange={handleZIndexChange}
              />
            )}
            <DesktopIcon
              onDoubleClick={() => handleIconDoubleClick(child, index)}
              children={child}
            />
          </div>
        ))}
      </div>
      <div className='DesktopToolbar'>
        {/* Content of the DesktopToolbar component */}
      </div>
    </div>
  );
};

export default Desktop;
