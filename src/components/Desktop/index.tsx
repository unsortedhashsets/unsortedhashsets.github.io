import React, { useEffect, useState } from 'react';
import './Desktop.scss';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import { AppProps } from './components/App';
import { logger } from '../../Main';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface DesktopProps {
  children: React.ReactElement<AppProps>[];
}

export const ZIndex = 100;

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openContextMenu = Boolean(anchorEl);
  const [windowsZIndex, setWindowsZIndex] = useState<number>(ZIndex);
  const [isWindowOpen, setWindowOpen] = useState<{ [key: number]: boolean }>(
    {}
  );

  const [isWindowMinimized, setWindowMinimized] = useState<{
    [key: number]: boolean;
  }>({});

  const [programButtonIndex, setProgramButtonIndex] = useState<number[]>([]);

  const handleZIndexChange = (newValue: number) => {
    setWindowsZIndex(newValue);
  };

  const updateStateValue = (state: Function, index: number, value: boolean) => {
    state((prevState: any) => ({
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
    updateStateValue(setWindowOpen, index, true);
    logger.log(`Window opened with: ${child.props.title}-${index}`);
  };

  const handleContextMenuProgramButton = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseWindow = (
    child: React.ReactElement<AppProps>,
    index: number
  ) => {
    updateStateValue(setWindowOpen, index, false);
    logger.log(`Window closed with: ${child.props.title}-${index}`);
  };

  const handleMinimizeWindow = (
    child: React.ReactElement<AppProps>,
    index: number,
    minimized: boolean
  ) => {
    updateStateValue(setWindowMinimized, index, minimized);
    logger.log(`Window minimized with: ${child.props.title}-${index}`);
  };

  const handleCloseMenuProgramButton = (
    action: string,
    child: React.ReactElement<AppProps>,
    index: number
  ) => {
    setAnchorEl(null);
    switch (action) {
      case 'Unminimize':
        handleMinimizeWindow(child, index, false);
        break;
      case 'Minimize':
        handleMinimizeWindow(child, index, true);
        break;
      case 'Maximize/Unmaximize':
        console.log('Maximize/Unmaximize');
        break;
      case 'Close':
        handleCloseWindow(child, index);
        break;
    }
  };

  return (
    <div className='Desktop'>
      <div className='DesktopGrid'>
        {children.map((child, index) => {
          return (
            <div key={index}>
              <Window
                children={child}
                onClose={() => handleCloseWindow(child, index)}
                onMinimize={() => handleMinimizeWindow(child, index, true)}
                isOpen={isWindowOpen[index]}
                isMinimized={isWindowMinimized[index]}
                title={child.props.title}
                windowsZIndex={windowsZIndex}
                handleZIndexChange={handleZIndexChange}
              />
              <DesktopIcon
                onDoubleClick={() => handleIconDoubleClick(child, index)}
                children={child}
              />
            </div>
          );
        })}
      </div>

      <div className='DesktopToolbar'>
        {programButtonIndex.map((index) => {
          if (isWindowOpen[index]) {
            const child = children[index];
            return (
              <span key={`${index}-${child.props.title}`}>
                <Button
                  style={{
                    height: '100%',
                    minWidth: '30px',
                  }}
                  variant='contained'
                  onClick={() => handleMinimizeWindow(child, index, false)}
                  aria-controls={openContextMenu ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={openContextMenu ? 'true' : undefined}
                  onContextMenu={(event) =>
                    handleContextMenuProgramButton(index, event)
                  }
                >
                  {child.props.title}
                </Button>
                <Menu
                  id='basic-menu'
                  open={openContextMenu}
                  onClose={() => handleCloseMenuProgramButton('', child, index)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {isWindowMinimized[index] ? (
                    <MenuItem
                      onClick={() =>
                        handleCloseMenuProgramButton('Unminimize', child, index)
                      }
                    >
                      Unminimize
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={() =>
                        handleCloseMenuProgramButton('Minimize', child, index)
                      }
                    >
                      Minimize
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() =>
                      handleCloseMenuProgramButton(
                        'Maximize/Unmaximize',
                        child,
                        index
                      )
                    }
                  >
                    Maximize/Unmaximize
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleCloseMenuProgramButton('Close', child, index)
                    }
                  >
                    Close
                  </MenuItem>
                </Menu>
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
