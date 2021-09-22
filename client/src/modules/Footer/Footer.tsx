import XLSX from 'xlsx';
import {
  Button,
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
import { loadFiles } from '../../helpers/loadFiles';
import { readWbFromFile } from '../../helpers/readWorksheet';
import { dang_replaceState, RootState } from '../../redux/store';
import {
  deepObjToWorkbook,
  workbookToDeepObj,
} from '../../helpers/deep-obj-wb-converters';
import { useState } from 'react';

export const Footer = (): JSX.Element => {
  const cMode = useColorMode();
  const state = useState();

  return (
    <Flex
      bg={cMode.colorMode === 'light' ? 'gray.400' : 'gray.700'}
      height="100%"
      align="center"
      px="2"
      justify="space-between"
    >
      <Flex>
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
      <Flex
        colorScheme="gray"
        direction="column"
        align="center"
        justify="center"
        fontSize="sm"
      >
        <Text style={{ opacity: 0.7 }}>2021</Text>
        <Link href="">powered by Chakra UI</Link>
        <Link href="">illustrations fron undraw</Link>
      </Flex>

      <HStack>
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
                      href="https://github.com/no95typem/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="column"
                    >
                      <Text fontSize="sm">The project</Text>
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
                <UnorderedList ml="0" style={{ listStyle: 'none' }}>
                  <ListItem>
                    <Link
                      href="https://github.com/no95typem/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="column"
                    >
                      <Text fontSize="sm">The project</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://github.com/no95typem/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="column"
                    >
                      <Text fontSize="sm">no95typem</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://github.com/kaesid/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="column"
                    >
                      <Text fontSize="sm">kaesid</Text>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href="https://github.com/vimbi/"
                      display="flex"
                      alignItems="center"
                      gridGap="1"
                      flexDirection="column"
                    >
                      <Text fontSize="sm">vimbi</Text>
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
