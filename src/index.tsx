import ReactDOM from 'react-dom/client';


import Minesweeper from './components/Minesweeper';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Minesweeper />
);