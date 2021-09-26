import {
  ChakraProvider,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import { theme } from '../theme';
import { ReactComponent as UndrawAddDocument } from '../assets/images/undraw/add-document.svg';
import { store } from '../redux/store';
import { tryImportIssues } from '../redux/slices/session';

export const showIssueImportDialog = () => {
  const div = document.createElement('div');

  const removeSelf = () => {
    ReactDOM.render(<></>, div);
    div.remove();
  };

  ReactDOM.render(
    <ChakraProvider theme={theme}>
      <Modal isOpen onClose={removeSelf} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl" textAlign="center" fontFamily="handwrite">
            Import issues
          </ModalHeader>

          <ModalBody mb="20px">
            <Flex direction="column" align="center">
              <Text textAlign="center">hello!</Text>

              <IconButton
                height="fit-content"
                width="fit-content"
                p={2}
                pr="13%"
                variant="ghost"
                aria-label="import file"
                onClick={() => store.dispatch(tryImportIssues())}
                icon={<UndrawAddDocument width="150px" />}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>,
    div,
  );

  document.body.append(div);
};
