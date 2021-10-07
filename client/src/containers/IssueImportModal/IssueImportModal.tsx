import {
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Text,
  Thead,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Divider,
  CloseButton,
} from '@chakra-ui/react';
import { ReactComponent as UndrawAddDocument } from '../../assets/images/undraw/add-document.svg';

import { DownloadIcon } from '@chakra-ui/icons';
import { useRef } from 'react';
import { exportTemplate } from '../../helpers/read-issues-from-wb';
import { tryImportIssues } from '../../redux/slices/session';
import { useAppDispatch } from '../../redux/store';

export interface IIssueImportModalProps {
  removeSelf: () => void;
}

export const IssueImportModal = (props: IIssueImportModalProps) => {
  const ref = useRef(null!);
  const dispatch = useAppDispatch();

  return (
    <Modal isOpen onClose={props.removeSelf} isCentered initialFocusRef={ref}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl" textAlign="center" fontFamily="handwrite">
          Import issues
        </ModalHeader>

        <CloseButton
          onClick={props.removeSelf}
          style={{ position: 'absolute', top: '5px', right: '5px' }}
        />

        <ModalBody mb="20px">
          <Flex direction="column" align="center" gridGap={4}>
            <Text textAlign="center">
              We can import any workbook that contains such structure:
            </Text>
            <Box borderWidth="2px" borderRadius="lg" p={2}>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Row/Col</Th>
                    <Th>?</Th>
                    <Th>?+1</Th>
                    <Th>?+2</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="semibold">1</Td>
                    <Td fontStyle="italic" fontWeight="semibold">
                      title
                    </Td>
                    <Td fontStyle="italic" fontWeight="semibold">
                      link
                    </Td>
                    <Td fontStyle="italic" fontWeight="semibold">
                      priority
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">2</Td>
                    <Td>issue name 1</Td>
                    <Td>https://...</Td>
                    <Td>low</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">3</Td>
                    <Td>issue name 2</Td>
                    <Td>https://...</Td>
                    <Td>high</Td>
                  </Tr>
                  <Tr>
                    <Td borderBottom={0} fontWeight="semibold">
                      ...
                    </Td>
                    <Td borderBottom={0}>...</Td>
                    <Td borderBottom={0}>...</Td>
                    <Td borderBottom={0}>...</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            <Button
              variant="link"
              rightIcon={<DownloadIcon />}
              onClick={exportTemplate}
            >
              You can download a template
            </Button>

            <Divider orientation="horizontal" />

            <Text textAlign="center" fontFamily="handwrite" fontSize="xl">
              Choose file:
            </Text>

            <IconButton
              ref={ref}
              height="fit-content"
              width="fit-content"
              p={2}
              paddingRight="12%"
              variant="ghost"
              aria-label="import file"
              onClick={() => dispatch(tryImportIssues())}
              icon={<UndrawAddDocument width="150px" />}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
