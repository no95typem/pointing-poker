import ButtonsSet, {
  IButtonData,
  IButtonsSetData,
} from '../../components/ButtonsSet/ButtonsSet';
import { renderSelfRemovingElement } from '../../helpers/renderSelfRemovingElement';
import { IssueImportModal } from '../IssueImportModal/IssueImportModal';

interface INewIssueModal {
  modal: () => void;
}

const NewIssuesButtons = (props: INewIssueModal): JSX.Element => {
  const { modal } = props;

  const first: IButtonData = {
    onClick: () => renderSelfRemovingElement(IssueImportModal),
    text: 'Upload issues',
    variant: 'outline',
  };

  const second: IButtonData = {
    onClick: modal,
    text: 'Create issue',
  };

  const buttonsSetData: IButtonsSetData = { first, second, isLoading: false };

  return <ButtonsSet {...buttonsSetData} />;
};

export default NewIssuesButtons;
