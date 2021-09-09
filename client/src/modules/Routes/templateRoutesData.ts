// ! Kaesid - временный файл, на удаление после того, как определимся с чакровскими компонентами

import { IRoute } from './routesData';

import Alerts from '../../components/templates/Alerts/Alerts';
import ChakraAnimation from '../../components/templates/Animation/ChakraAnimation';
import ChakraAlertDialog from '../../components/templates/AlertDialog/ChakraAlertDialog';
import ChakraButtons from '../../components/templates/ChakraButtons/ChakraButtons';
import ChakraModal from '../../components/templates/Modal/ChakraModal';
import ChakraAvatar from '../../components/templates/Avatar/ChakraAvatar';
import ChakraLoader from '../../components/templates/Loader/ChakraLoader';
import ChakraEditableText from '../../components/templates/EditableText/ChakraEditableText';
import ActionButtonExample from '../../containers/ComponentsExamples/Buttons/ButtonsExample';
import UserCardExample from '../../containers/ComponentsExamples/UserCard/UserCardExample';
import Settings from '../../containers/Settings/Settings';

export enum TemplateRoutesPath {
  ROOT = '/',
  ANIMATION = '/animation/',
  ALERTS = '/alerts/',
  ALERT_DIALOG = '/alert-dialog/',
  BUTTONS = '/buttons/',
  MODAL = '/modal/',
  AVATAR = '/avatar/',
  LOADER = '/loader/',
  EDITABLE = '/editable/',
  BUTTONS_EXAMPLE = '/buttons-example',
  USER_CARD = '/user-cards',
  SETTINGS = '/settings',
}

const templatesRoutes: IRoute[] = [
  {
    key: 'chakraAnimation',
    path: TemplateRoutesPath.ANIMATION,
    isExact: true,
    Component: ChakraAnimation,
  },
  {
    key: 'chakraAlerts',
    path: TemplateRoutesPath.ALERTS,
    isExact: true,
    Component: Alerts,
  },
  {
    key: 'chakraAlertDialog',
    path: TemplateRoutesPath.ALERT_DIALOG,
    isExact: true,
    Component: ChakraAlertDialog,
  },
  {
    key: 'chakraButtons',
    path: TemplateRoutesPath.BUTTONS,
    isExact: true,
    Component: ChakraButtons,
  },
  {
    key: 'chakraModal',
    path: TemplateRoutesPath.MODAL,
    isExact: true,
    Component: ChakraModal,
  },
  {
    key: 'chakraAvatar',
    path: TemplateRoutesPath.AVATAR,
    isExact: true,
    Component: ChakraAvatar,
  },
  {
    key: 'chakraLoader',
    path: TemplateRoutesPath.LOADER,
    isExact: true,
    Component: ChakraLoader,
  },
  {
    key: 'chakraEditableText',
    path: TemplateRoutesPath.EDITABLE,
    isExact: true,
    Component: ChakraEditableText,
  },
  {
    key: 'buttonsExample',
    path: TemplateRoutesPath.BUTTONS_EXAMPLE,
    isExact: true,
    Component: ActionButtonExample,
  },
  {
    key: 'userPanel',
    path: TemplateRoutesPath.USER_CARD,
    isExact: true,
    Component: UserCardExample,
  },
  {
    key: 'settings',
    path: TemplateRoutesPath.SETTINGS,
    isExact: true,
    Component: Settings,
  },
];

export default templatesRoutes;
