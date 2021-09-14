import ChakraButtons from '../../components/templates/ChakraButtons/ChakraButtons';
import Lobby from '../Lobby/Lobby';
import HomePage from '../HomePage/HomePage';

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
  ROUTE_404 = '*', // а нужен ли он нам?, может просто редирект на ROOT ?
  ERROR = '/error',
  LOADING = '/loading',
}

const routes: IRoute[] = [
  {
    key: 'routeRoot',
    path: RoutesPath.ROOT,
    isExact: true,
    Component: HomePage, //Заглушка, заменяем своими компонентами по мере готовности
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
    Component: ChakraButtons, //Заглушка, заменяем своими компонентами по мере готовности
  },
  {
    key: 'routeStats',
    path: RoutesPath.STATS,
    isExact: true,
    Component: ChakraButtons, //Заглушка, заменяем своими компонентами по мере готовности
  },
  {
    key: 'route404',
    path: RoutesPath.ROUTE_404,
    isExact: false,
    Component: ChakraButtons, //Заглушка, заменяем своими компонентами по мере готовности
  },
];

export default routes;
