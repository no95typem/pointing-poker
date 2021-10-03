import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { BellIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex } from '@chakra-ui/layout';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover';
import { Portal } from '@chakra-ui/portal';
import { useEffect, useRef } from 'react';
import { Notification } from '../../containers/Notification/Notification';
import { notifSlice } from '../../redux/slices/notifications';
import { useAppDispatch, useTypedSelector } from '../../redux/store';

export const NotificationPopover = (): JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const alerts = useTypedSelector(state => state.alerts);
  const alertsEntries = Object.entries(alerts);
  const needToShow = alertsEntries.some(entry => entry[1].needToShow);

  useEffect(() => {
    if (needToShow) {
      onOpen();
      // Timeout is needed here because an another popover can steal focus without it!
      setTimeout(() => {
        dispatch(notifSlice.actions.resetEssentials());
      }, 200); // real timeout is needed because popover will be closed after any click if there is no real timeout
    }
  });

  return (
    <Popover isOpen={isOpen || needToShow} onClose={onClose}>
      <PopoverTrigger>
        <Box pos="relative" onClick={onOpen}>
          <IconButton aria-label="info" icon={<BellIcon />} />
          <Badge
            pos="absolute"
            right="0px"
            top="0px"
            borderRadius="base"
            colorScheme={alertsEntries.length ? 'orange' : undefined}
            fontSize="x-small"
          >
            {alertsEntries.length}
          </Badge>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          width="fit-content"
          maxW="100vw"
          maxH="80vh"
          overflow="auto"
          ref={ref}
        >
          <PopoverBody display="flex" flexDirection="column" gridGap="1">
            {alertsEntries.length === 0 && 'There are no new notifications'}
            {alertsEntries.map(([key, val]) => {
              const onDismiss = () => {
                dispatch(notifSlice.actions.removeAlertRec(+key));
                ref.current?.focus();
              };

              return (
                <Flex key={key} align="center" gridGap="1">
                  <Notification n={val} onDismiss={onDismiss} />
                </Flex>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
