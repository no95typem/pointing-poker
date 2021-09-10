import React from 'react';

import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';

const ChakraEditableText = (): JSX.Element => {
  return (
    <>
      <Editable defaultValue="Click to edit">
        <EditablePreview />
        <EditableInput />
      </Editable>
    </>
  );
};

export default ChakraEditableText;
