import {
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
} from '@chakra-ui/react';
import { ImGithub } from 'react-icons/im';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import { ChakraLogo } from '../../components/ChakraLogo/ChakraLogo';
import { ReactComponent as UndrawImageFocus } from '../../assets/images/undraw/image-focus.svg';
import { ReactComponent as RSSLogo } from '../../assets/images/shared/rss-logo.svg';
import { NotificationPopover } from '../NotificationPopover/NotificationPopover';
import { BsChatQuote } from 'react-icons/bs';

export const Footer = (): JSX.Element => {
  const cMode = useColorMode();

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
          isExternal
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
        <NotificationPopover />
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
                      isExternal
                    >
                      <FaGithub />
                      <Text>The project repository</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href=""
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="row"
                      isExternal
                    >
                      <FaYoutube />
                      <Text>A short video presentation</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://chakra-ui.com"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="row"
                      isExternal
                    >
                      <ChakraLogo h="1rem" pointerEvents="none" />
                      <Text>powered by Chakra UI</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://undraw.co"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="row"
                      isExternal
                    >
                      <UndrawImageFocus height="1rem" />
                      <Text>illustrations from unDraw</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://github.com/lukePeavey/quotable"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="row"
                      isExternal
                    >
                      <BsChatQuote />
                      <Text>quotes from quotable</Text>
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
                      isExternal
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
                      isExternal
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
                      isExternal
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
                      isExternal
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
