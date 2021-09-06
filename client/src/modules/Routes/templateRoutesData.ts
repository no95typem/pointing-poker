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
];

export default templatesRoutes;
