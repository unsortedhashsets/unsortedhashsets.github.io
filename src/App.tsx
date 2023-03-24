import Logger from "./components/Logger";
import "./App.scss";
import Minesweeper from "./components/Minesweeper";
import Window from "./components/Window";
//import ContactMe from "./components/ContactMe";
import Sender from "./components/ContactMe/Utils";

export const logger =  new Logger();
export const sender = new Sender();

logger.log("App started");

const App = () => {
  return (
    <div className="app">
        <Window title={"Minesweeper"}>
            <Minesweeper/>
        </Window>
        {/* <Window title={"ContactMe"}>
            <ContactMe/>
        </Window> */}
    </div>
  );
};

export default App;