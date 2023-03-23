import Logger from "./components/Logger";
import "./App.scss";
import Minesweeper from "./components/Minesweeper";
import Window from "./components/Window";

export const logger =  new Logger();
logger.log("App started");

const App = () => {
  return (
    <div className="app">
        <Window title={"Minesweeper"}>
            <Minesweeper/>
        </Window>
    </div>
  );
};

export default App;