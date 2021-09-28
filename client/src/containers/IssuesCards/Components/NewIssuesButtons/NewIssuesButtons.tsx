import React from 'react';
import { Button, Stack } from '@chakra-ui/react';

import { showIssueImportDialog } from '../../../../helpers/showIssueUploadDialog';

interface INewIssueModal {
  modal: () => void;
}

const NewIssuesButtons = (props: INewIssueModal): JSX.Element => {
  const { modal } = props;

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      wrap="wrap"
      style={{ gap: '20px', marginBottom: '10px' }}
    >
      <Button
        colorScheme="facebook"
        w="130px"
        variant="outline"
        onClick={showIssueImportDialog}
      >
        Upload issues
      </Button>
      <Button
        colorScheme="facebook"
        w="130px"
        variant="solid"
        style={{ marginInlineStart: '0' }}
        onClick={modal}
      >
        Create issue
      </Button>
    </Stack>
  );
};

export default NewIssuesButtons;
