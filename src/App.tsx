import "./App.scss";
import Minesweeper from "./components/Minesweeper";
import Window from "./components/Window";

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