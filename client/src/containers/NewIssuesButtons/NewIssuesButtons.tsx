import React from 'react';

import { showIssueImportDialog } from '../../helpers/showIssueUploadDialog';

import ButtonsSet, {
  IButtonData,
  IButtonsSetData,
} from '../../components/ButtonsSet/ButtonsSet';

interface INewIssueModal {
  modal: () => void;
}

const NewIssuesButtons = (props: INewIssueModal): JSX.Element => {
  const { modal } = props;

  const first: IButtonData = {
    onClick: showIssueImportDialog,
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
