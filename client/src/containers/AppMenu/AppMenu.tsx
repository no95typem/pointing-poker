import { Button, IconButton } from '@chakra-ui/button';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover';
import { Portal } from '@chakra-ui/portal';
import { renderSelfRemovingElement } from '../../helpers/renderSelfRemovingElement';
import { ImportExportResultsModal } from '../ImportExportResultsModal/ImportExportResultsModal';

export const AppMenu = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          style={{ marginInlineStart: '0px' }}
          aria-label="menu"
          icon={<HamburgerIcon />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="fit-content">
          <PopoverBody>
            <Flex direction="column" gridGap={2}>
              <Button
                border="1px solid black"
                onClick={() =>
                  renderSelfRemovingElement(ImportExportResultsModal)
                }
              >
                Import / Export
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
