import ChakraButtons from '../../components/templates/ChakraButtons/ChakraButtons';
import Lobby from '../Lobby/Lobby';
import StartPage from '../HomePage/StartPage';
import Game from '../Game/Game';

export interface IRoute {
  key: string;
  path: string;
  isExact: boolean;
  Component: React.FunctionComponent | React.ComponentClass;
}

export enum RoutesPath {
  ROOT = '/',
  LOBBY = '/session/:id/lobby',
  GAME = '/session/:id/game',
  STATS = '/session/:id/stats',
  ERROR = '/error',
  LOADING = '/loading',
}

const routes: IRoute[] = [
  {
    key: 'routeRoot',
    path: RoutesPath.ROOT,
    isExact: true,
    Component: StartPage, //Заглушка, заменяем своими компонентами по мере готовности
  },
  {
    key: 'routeLobby',
    path: RoutesPath.LOBBY,
    isExact: true,
    Component: Lobby,
  },
  {
    key: 'routeGame',
    path: RoutesPath.GAME,
    isExact: true,
    Component: Game,
  },
  {
    key: 'routeStats',
    path: RoutesPath.STATS,
    isExact: true,
    Component: ChakraButtons, //Заглушка, заменяем своими компонентами по мере готовности
  },
];

export default routes;
