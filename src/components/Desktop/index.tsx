import { useState } from 'react';
import './Desktop.scss';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import React from 'react';
import { AppProps } from './components/App';
import { logger } from '../../Main';

interface DesktopProps {
    children: React.ReactElement<AppProps>;
  }

const Desktop = ({ children }: DesktopProps) => {

    const [isWindowOpen, setWindowOpen] = useState(false);

    const handleIconDoubleClick = () => {
        setWindowOpen(true);
        logger.log(`Window opened with: ${children.props.title}`);
      };
  
    const handleCloseWindow = () => {
      setWindowOpen(false);
      logger.log(`Window closed with: ${children.props.title}`);
    };

  return (
    <div className="Desktop">
        {isWindowOpen && (
            <Window children={children} onClose={handleCloseWindow} isOpen={isWindowOpen} title={children.props.title}/>
        )}
            <div className="DesktopGrid">
          <DesktopIcon onDoubleClick={handleIconDoubleClick} children={children} />
      </div>
      <div className="DesktopToolbar">
        {/* Content of the DesktopToolbar component */}
      </div>
    </div>
  );
};

export default Desktop;