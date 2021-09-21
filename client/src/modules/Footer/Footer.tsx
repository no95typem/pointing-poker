import XLSX from 'xlsx';

import { Button, Flex } from '@chakra-ui/react';
import { loadFiles } from '../../helpers/loadFiles';
import { readWbFromFile } from '../../helpers/readWorksheet';
import {
  deepObjToWorkbook,
  workbookToDeepObj,
} from '../../helpers/deep-obj-wb-converters';
import {
  dang_replaceState,
  RootState,
  useTypedSelector,
} from '../../redux/store';

export const Footer = (): JSX.Element => {
  const state = useTypedSelector(state => state);

  return (
    <Flex bg="gray.300" height="100%">
      Footer
      <Button
        onClick={() => {
          loadFiles()
            .then(fileList => {
              if (fileList[0]) {
                readWbFromFile(fileList[0]).then(wb => {
                  console.log(wb);
                  const deepObj = workbookToDeepObj(wb);
                  console.log(deepObj);
                  dang_replaceState(deepObj as RootState);
                });
              }
            })
            .catch(() => {});
        }}
      >
        load xlsx
      </Button>
      <Button
        onClick={() => {
          const wb = deepObjToWorkbook(
            state as unknown as Record<string, unknown>,
            '',
          );
          XLSX.writeFile(wb, 'state.xlsx');
        }}
      >
        save xlsx
      </Button>
    </Flex>
  );
};
