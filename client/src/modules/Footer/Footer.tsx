import {
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  UnorderedList,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { ImGithub } from 'react-icons/im';
import {
  BellIcon,
  CheckIcon,
  CloseIcon,
  InfoOutlineIcon,
  NotAllowedIcon,
} from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';
import { ChakraLogo } from '../../components/ChakraLogo/ChakraLogo';
import { ReactComponent as UndrawImageFocus } from '../../assets/images/undraw/image-focus.svg';
import { ReactComponent as RSSLogo } from '../../assets/images/shared/rss-logo.svg';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { INotification, notifSlice } from '../../redux/slices/notifications';
import { GenericAlert } from '../../components/GenericAlert/GenericAlert';
import React, { useEffect, useRef } from 'react';
import { SERVER_ADAPTER } from '../ServerAdapter/serverAdapter';
import UserCard from '../../components/UserCard/UserCard';
import { Member } from '../../../../shared/types/session/member';

const renderNotification = (
  n: INotification,
  onDismiss: () => void,
): JSX.Element => {
  switch (n.specialType) {
    case 'new-connection':
      const newMemeber = n.addData as Member;

      return (
        <>
          <Box px={1}>
            <Text>Allow new member to connect?</Text>
            <UserCard
              member={newMemeber}
              isItYou={false}
              isRoundStarted={true}
              size="sm"
            />
          </Box>
          <IconButton
            aria-label="allow connection"
            icon={<CheckIcon />}
            onClick={() => {
              SERVER_ADAPTER.respondToNewConnection(
                newMemeber.userSessionPublicId,
                true,
              );
              onDismiss();
            }}
          />
          <IconButton
            aria-label="reject connection"
            icon={<NotAllowedIcon />}
            onClick={() => {
              SERVER_ADAPTER.respondToNewConnection(
                newMemeber.userSessionPublicId,
                false,
              );
              onDismiss();
            }}
          />
        </>
      );
    default:
      return (
        <>
          <GenericAlert {...n} />
          <IconButton
            aria-label="dismiss"
            icon={<CloseIcon />}
            onClick={onDismiss}
          />
        </>
      );
  }
};

export const Footer = (): JSX.Element => {
  const cMode = useColorMode();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const alerts = useTypedSelector(state => state.alerts);
  const alertsEntries = Object.entries(alerts);
  const needToShow = alertsEntries.some(entry => entry[1].needToShow);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (needToShow) {
      onOpen();
      // Timeout is needed here because an another popover can steal focus without it!
      setTimeout(() => {
        dispatch(notifSlice.actions.resetEssentials());
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  });

  console.log(isOpen, needToShow);

  return (
    <Flex
      bg={cMode.colorMode === 'light' ? 'gray.400' : 'gray.700'}
      height="100%"
      align="center"
      px="2"
      justify="space-between"
    >
      <HStack>
        <Link
          href="https://rs.school/js/"
          display="flex"
          alignItems="center"
          gridGap="1"
          flexDirection="row"
          _hover={{ textDecoration: 'none' }}
        >
          <RSSLogo />
          <Text
            fontSize="xl"
            fontFamily="sans-serif"
            fontWeight="bold"
            style={{ opacity: 0.7 }}
            color="#cbd5de"
          >
            2021
          </Text>
        </Link>
      </HStack>

      <HStack>
        <Popover
          isOpen={isOpen || needToShow}
          onClose={onClose}
          placement="top"
        >
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
                  const content = renderNotification(val, onDismiss);

                  return (
                    <Flex key={key} align="center" gridGap="1">
                      {content}
                    </Flex>
                  );
                })}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <IconButton aria-label="info" icon={<InfoOutlineIcon />} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent width="fit-content">
              <PopoverBody>
                <UnorderedList ml="0" style={{ listStyle: 'none' }}>
                  <ListItem>
                    <Link
                      href="https://github.com/no95typem/pointing-poker"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="row"
                    >
                      <FaGithub />
                      <Text>The project repository</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://chakra-ui.com"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="row"
                    >
                      <ChakraLogo h="1rem" pointerEvents="none" />
                      <Text>powered by Chakra UI</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href=" https://undraw.co"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="row"
                    >
                      <UndrawImageFocus height="1rem" />
                      <Text>illustrations from unDraw</Text>
                    </Link>
                  </ListItem>
                </UnorderedList>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="gtihub"
              icon={<ImGithub style={{ transform: 'scale(1.5)' }} />}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent width="fit-content">
              <PopoverBody>
                <UnorderedList
                  ml="0"
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                  style={{ listStyle: 'none' }}
                >
                  <ListItem>
                    <Link
                      href="https://github.com/no95typem/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                    >
                      <Text>The project repository</Text>
                      <FaGithub />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://github.com/no95typem/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                    >
                      <Text>no95typem</Text>
                      <FaGithub />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://github.com/kaesid/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                    >
                      <Text>kaesid</Text>
                      <FaGithub />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://github.com/vimbi/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                    >
                      <Text>vimbi</Text>
                      <FaGithub />
                    </Link>
                  </ListItem>
                </UnorderedList>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
    </Flex>
  );
};
