import { RoutesPath } from '../Routes/routesData';
import { TemplateRoutesPath } from '../Routes/templateRoutesData';

export interface ILink {
  link: string;
  text: string;
}

const templatesLinks: ILink[] = [
  {
    text: 'Root',
    link: TemplateRoutesPath.ROOT,
  },
  {
    text: 'Lobby',
    link: RoutesPath.LOBBY,
  },
  {
    text: 'Animation',
    link: TemplateRoutesPath.ANIMATION,
  },
  {
    text: 'Alerts',
    link: TemplateRoutesPath.ALERTS,
  },
  {
    text: 'AlertDialog',
    link: TemplateRoutesPath.ALERT_DIALOG,
  },
  {
    text: 'Modal',
    link: TemplateRoutesPath.MODAL,
  },
  {
    text: 'Buttons',
    link: TemplateRoutesPath.BUTTONS,
  },
  {
    text: 'Avatars',
    link: TemplateRoutesPath.AVATAR,
  },
  {
    text: 'Loader',
    link: TemplateRoutesPath.LOADER,
  },
  {
    text: 'Editable Text',
    link: TemplateRoutesPath.EDITABLE,
  },
  {
    text: 'Buttons Example',
    link: TemplateRoutesPath.BUTTONS_EXAMPLE,
  },
  {
    text: 'Settings',
    link: TemplateRoutesPath.SETTINGS,
  },
  {
    text: 'Issues',
    link: TemplateRoutesPath.ISSUES,
  },
  {
    text: 'Game Cards',
    link: TemplateRoutesPath.CARDS,
  },
];

export default templatesLinks;
