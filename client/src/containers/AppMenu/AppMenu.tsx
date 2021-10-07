import { Flex } from '@chakra-ui/layout';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover';
import { Button, IconButton } from '@chakra-ui/button';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import { Portal } from '@chakra-ui/portal';

import { renderSelfRemovingElement } from '../../helpers/renderSelfRemovingElement';
import { SYSTEM_AUDIO } from '../../helpers/SystemAudio';

import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { tryToToggleSound } from '../../redux/slices/sound';

import { ImportExportResultsModal } from '../ImportExportResultsModal/ImportExportResultsModal';

export const AppMenu = () => {
  const dispatch = useAppDispatch();

  const { isMute } = useTypedSelector(state => state.sound);

  const toggleSound = (): void => {
    dispatch(tryToToggleSound());

    SYSTEM_AUDIO.play('info');
  };

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
              <Button
                border="1px solid black"
                aria-label="sound toggle"
                onClick={toggleSound}
                leftIcon={
                  isMute ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />
                }
              >
                Toggle Sound
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
