import React from 'react';
import { AppProps } from '../App';
import { isValidElement } from 'react';

interface DesktopIconProps {
  children: React.ReactElement<AppProps>;
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  children,
  onDoubleClick,
}) => {
  return (
    <div>
      {isValidElement(children) && (
        <div className='DesktopIcon' onDoubleClick={onDoubleClick}>
          <img src={children.props.icon} alt='' />
          <span>{children.props.title}</span>
        </div>
      )}
    </div>
  );
};

export default DesktopIcon;
