import XLSX from 'xlsx';
import { ChatIcon, HamburgerIcon } from '@chakra-ui/icons';

import logo from '../../assets/images/shared/logo.svg';

import {
  VisuallyHidden,
  Flex,
  IconButton,
  Spacer,
  HStack,
  Image,
  useColorMode,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverBody,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../containers/ColorModeSwitcher/ColorModeSwitcher';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { tryToToggleChatState } from '../../redux/slices/chat';
import { loadFiles } from '../../helpers/loadFiles';
import { deepObjToWorkbook } from '../../helpers/deep-obj-wb-converters';
import { tryLoadSessionFromFile } from '../../redux/slices/session';
import { showIssueImportDialog } from '../../helpers/showIssueUploadDialog';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const cMode = useColorMode();

  const toggleChat = (): void => {
    dispatch(tryToToggleChatState());
  };

  const sessionState = useTypedSelector(state => state.session);

  return (
    <Flex
      bg={cMode.colorMode === 'light' ? 'gray.400' : 'gray.700'}
      height="100%"
      alignItems="center"
      justifyContent="space-between"
      px="2"
    >
      <HStack h="100%" fontFamily="handwrite">
        <Image src={logo} maxH="95%" />
        <h1>
          Pointing Poker
          <VisuallyHidden>by no95typem, kaesid, vimbi</VisuallyHidden>
        </h1>
      </HStack>

      <HStack justifySelf="end">
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
        <Spacer />
        <IconButton
          style={{ marginInlineStart: '0px' }}
          aria-label="chat"
          icon={<ChatIcon />}
          onClick={toggleChat}
        />
        <Spacer />

        <Popover>
          <PopoverTrigger>
            <IconButton
              style={{ marginInlineStart: '0px' }}
              aria-label="menu"
              icon={<HamburgerIcon />}
              // onClick={toggleChat}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent width="fit-content">
              <PopoverBody>
                <Button
                  onClick={() => {
                    loadFiles().then(fileList => {
                      if (fileList[0]) {
                        dispatch(tryLoadSessionFromFile(fileList[0]));
                      }
                    });
                  }}
                >
                  load xlsx
                </Button>
                <Button
                  onClick={() => {
                    const wb = deepObjToWorkbook({
                      obj: sessionState as unknown as Record<string, unknown>,
                      name: '',
                      copy: true,
                    });
                    XLSX.writeFile(wb, 'pp-session.xlsx');
                  }}
                >
                  save xlsx
                </Button>
                <Button onClick={showIssueImportDialog}>
                  Show Import Issues Dialog
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
    </Flex>
  );
};
