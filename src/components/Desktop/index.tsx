import React, { useEffect, useState } from 'react';
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
  const [programButtonIndex, setProgramButtonIndex] = useState<number[]>([]);

  const handleZIndexChange = (newValue: number) => {
    setWindowsZIndex(newValue);
  };

  const updateStateValue = (index: number, value: boolean) => {
    setWindowOpen((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  useEffect(() => {
    setProgramButtonIndex((prevIndex) => {
      const updatedIndex = [...prevIndex];

      for (let i = 0; i < children.length; i++) {
        if (isWindowOpen[i] && !updatedIndex.includes(i)) {
          updatedIndex.push(i);
        } else if (!isWindowOpen[i] && updatedIndex.includes(i)) {
          const indexToRemove = updatedIndex.indexOf(i);
          updatedIndex.splice(indexToRemove, 1);
        }
      }

      return updatedIndex;
    });
  }, [children.length, isWindowOpen]);

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
        {children.map((child, index) => {
          const isWindowVisible = isWindowOpen[index];
          return (
            <div key={index}>
              {isWindowVisible && (
                <Window
                  children={child}
                  onClose={() => handleCloseWindow(child, index)}
                  isOpen={isWindowVisible}
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
          );
        })}
      </div>

      <div className='ProgramButtons'>
        {programButtonIndex.map((index) => {
          if (isWindowOpen[index]) {
            const child = children[index];
            return (
              <span key={`${index}-${child.props.title}`}>
                <button>{child.props.title}</button>
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Desktop;
