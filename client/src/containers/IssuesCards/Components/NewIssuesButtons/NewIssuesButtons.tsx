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
      position="relative"
      direction="row"
      align="center"
      justify={['space-evenly', 'space-between']}
      maxW="320px"
      mb="20px"
    >
      <Button
        colorScheme="facebook"
        w="130px"
        p="0 10px"
        variant="outline"
        onClick={showIssueImportDialog}
      >
        Upload issues
      </Button>

      <Button
        colorScheme="facebook"
        w="130px"
        p="0 10px"
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
