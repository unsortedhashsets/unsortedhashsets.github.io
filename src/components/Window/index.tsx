import Draggable from "react-draggable";

import "./Window.scss";

interface WindowProps {
    children: JSX.Element;
    title: string;
  }

const Window: React.FC<WindowProps> = ({children, title}) => {
  
    return (
      <Draggable
        handle=".tw-draggable">
        <div className="tw-window">
            <div className="tw-header">
                <div className="tw-title  tw-draggable">
                    { title }
                </div>
                <div className="tw-buttons">
                    <button type="button" className="tw-button tw-minimize" disabled/>
                    <button type="button" className="tw-button tw-maximize" disabled/>
                    <button type="button" className="tw-button tw-close" disabled/>
                </div>
            </div>
            <div className="tw-body">
                { children }
            </div>
        </div>
      </Draggable>
    );
};
 
export default Window;