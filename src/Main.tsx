import Logger from "./components/Logger";
import "./Main.scss";
import Minesweeper from "./components/Minesweeper";
//import ContactMe from "./components/ContactMe";
import Sender from "./components/ContactMe/Utils";
import Desktop from "./components/Desktop";
import App from "./components/Desktop/components/App";

export const logger =  new Logger();
export const sender = new Sender();

logger.log("App started");

const Main = () => {
  return (
    <Desktop>
        <App 
        title={"Minesweeper"}
        icon={"https://s3.eu-west-1.amazonaws.com/unsortedhashsets.github.io/minesweeper.icon.png"}
        >
          <Minesweeper/>
        </App>
         {/*<Window title={"ContactMe"}>
            <ContactMe/>
        </Window> */}
    </Desktop>
  );
};

export default Main;