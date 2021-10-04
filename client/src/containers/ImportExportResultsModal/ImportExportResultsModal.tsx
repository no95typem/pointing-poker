import {
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
  Button,
  Divider,
  Select,
  Input,
  FormLabel,
  CloseButton,
} from '@chakra-ui/react';
import { ReactComponent as UndrawAddDocument } from '../../assets/images/undraw/add-document.svg';
import { ReactComponent as UndrawExportFiles } from '../../assets/images/undraw/export-files.svg';
import { ReactComponent as UndrawPizzaSharing } from '../../assets/images/undraw/pizza-sharing.svg';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import {
  ISaveArgs,
  tryLoadSessionFromFile,
  trySaveSessionToFile,
} from '../../redux/slices/session';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { SelfRemovingReactElement } from '../../types/SelfRemoving';
import { SESSION_STAGES } from '../../../../shared/types/session/state/stages';
import { loadFiles } from '../../helpers/loadFiles';

export interface IImportExportResultsModal {
  removeSelf: () => void;
}

export const ImportExportResultsModal: SelfRemovingReactElement = (
  props: IImportExportResultsModal,
) => {
  const ref = useRef(null!);
  const dispatch = useAppDispatch();
  const { stage, name } = useTypedSelector(state => state.session);
  const { errors, loads } = useTypedSelector(state => state);
  const [isExporting, setIsExporting] = useState(false);

  const [args, setArgs] = useState<ISaveArgs>({
    filename: `pp-export-${name.value}`,
    ext: 'xlsx',
  });

  const isErr = Object.keys(errors).length !== 0;
  const isLoading = Object.keys(loads).length !== 0;
  const isNormalSituation = !isErr && !isLoading;

  const isImportAvailable = isNormalSituation && stage === SESSION_STAGES.EMPTY;
  const isExportAvailable =
    isNormalSituation &&
    (stage === SESSION_STAGES.GAME || stage === SESSION_STAGES.STATS);

  return (
    <Modal
      isOpen
      onClose={props.removeSelf}
      isCentered
      initialFocusRef={ref}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent position="relative">
        <CloseButton
          position="absolute"
          top="5px"
          right="5px"
          onClick={props.removeSelf}
        />
        <ModalHeader fontSize="2xl" textAlign="center" fontFamily="handwrite">
          Import / Export results
        </ModalHeader>

        <ModalBody mb="20px">
          <Flex direction="column" align="center" gridGap={4}>
            <Text textAlign="center">
              You can import an exported file to view results of a previous
              session or you can export the current state to view current
              results later.
            </Text>

            <Divider orientation="horizontal" />

            <Flex justify="space-evenly" w="100%" gap={2}>
              <Flex
                direction="column"
                align="center"
                maxWidth={isExporting ? '0px' : '200px'}
                overflow={isExporting ? 'hidden' : undefined}
                transition="max-width 0.5s"
              >
                <Text textAlign="center" fontFamily="handwrite" fontSize="xl">
                  Import:
                </Text>

                {isImportAvailable ? (
                  <IconButton
                    ref={ref}
                    height="fit-content"
                    width="fit-content"
                    p={2}
                    paddingRight="12%"
                    variant="ghost"
                    aria-label="import file"
                    onClick={() => {
                      props.removeSelf();
                      loadFiles().then(fileList => {
                        if (fileList[0]) {
                          dispatch(tryLoadSessionFromFile(fileList[0]));
                        }
                      });
                    }}
                    icon={<UndrawAddDocument width="150px" />}
                  />
                ) : (
                  <Flex
                    direction="column"
                    align="center"
                    h="100%"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily="handwrite"
                      fontWeight="semibold"
                      fontSize="sm"
                      textAlign="center"
                    >
                      Available only on the start page
                    </Text>
                    <Box p="8px">
                      <UndrawPizzaSharing width="150px" />
                    </Box>
                  </Flex>
                )}
              </Flex>

              {isExportAvailable ? (
                <>
                  <Flex
                    direction="column"
                    align="center"
                    justifyContent="space-between"
                    position="relative"
                  >
                    <Text
                      textAlign="center"
                      fontFamily="handwrite"
                      fontSize="xl"
                    >
                      Export:
                    </Text>

                    <IconButton
                      ref={ref}
                      height="fit-content"
                      width="fit-content"
                      p={2}
                      paddingRight="12%"
                      variant="ghost"
                      aria-label="import file"
                      onClick={() => setIsExporting(true)}
                      icon={<UndrawExportFiles width="100px" />}
                    />
                    {isExporting && (
                      <IconButton
                        aria-label="go backward"
                        icon={<ArrowBackIcon />}
                        position="absolute"
                        right="10px"
                        bottom="1px"
                        variant="solid"
                        onClick={() => setIsExporting(false)}
                      />
                    )}
                  </Flex>

                  {isExporting && (
                    <Flex
                      direction="column"
                      align="center"
                      justifyContent="space-between"
                      maxWidth={isExporting ? '200px' : '0px'}
                      overflow="hidden"
                      transition="max-width 0.5s"
                      alignItems="flex-end"
                      ml="10px"
                    >
                      <Text
                        alignSelf="center"
                        textAlign="center"
                        fontFamily="handwrite"
                        fontSize="xl"
                      >
                        Options:
                      </Text>

                      <FormLabel m={0}>
                        <Text>Filename:</Text>
                        <Input
                          type="text"
                          value={args.filename}
                          onChange={e =>
                            setArgs({
                              ...args,
                              filename: e.target.value,
                            })
                          }
                        />
                      </FormLabel>

                      <Flex justify="space-between" w="100%" gridGap={2}>
                        <FormLabel m={0}>
                          <Text>Save as:</Text>
                          <Select
                            value={args.ext}
                            onChange={e =>
                              setArgs({
                                ...args,
                                ext: e.target.value as 'xlsx' | 'csv',
                              })
                            }
                          >
                            <option value="xlsx">xlsx</option>
                            <option value="csv">csv</option>
                          </Select>
                        </FormLabel>
                        <FormLabel m={0}>
                          <Text h="24px" />
                          <Button
                            border="1px solid black"
                            onClick={() => {
                              dispatch(trySaveSessionToFile(args));
                              props.removeSelf();
                            }}
                          >
                            Save
                          </Button>
                        </FormLabel>
                      </Flex>
                    </Flex>
                  )}
                </>
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  maxWidth={isExporting ? '0px' : '200px'}
                  overflow="hidden"
                  transition="max-width 0.5s"
                >
                  <Text textAlign="center" fontFamily="handwrite" fontSize="xl">
                    Export:
                  </Text>
                  <Flex
                    direction="column"
                    align="center"
                    h="100%"
                    w="100%"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily="handwrite"
                      fontWeight="semibold"
                      fontSize="sm"
                      textAlign="center"
                    >
                      Available only in a session
                    </Text>
                    <Box p="8px">
                      <UndrawPizzaSharing width="150px" />
                    </Box>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
