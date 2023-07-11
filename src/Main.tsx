import Logger from './components/Logger';
import './Main.scss';
import Minesweeper from './components/Minesweeper';
//import ContactMe from './components/ContactMe';
import Sender from './components/ContactMe/Utils';
import Desktop from './components/Desktop';
import App from './components/Desktop/components/App';

export const logger = new Logger();
export const sender = new Sender();

logger.log('App started');

const AppArray = [
  <App
    title={'Minesweeper-1'}
    icon={
      'https://s3.eu-west-1.amazonaws.com/unsortedhashsets.github.io/minesweeper.icon.png'
    }
  >
    <Minesweeper />
  </App>,
  //<App
  //  title={'ContactMe'}
  //  icon={
  //    'OMG I DONT HAVE AN ICON FOR THIS YET'
  //  }
  //>
  //  <ContactMe />
  //</App>
];

const Main: React.FC = () => {
  return <Desktop>{AppArray}</Desktop>;
};

export default Main;
