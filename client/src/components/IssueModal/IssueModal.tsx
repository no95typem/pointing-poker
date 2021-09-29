import React from 'react';

import {
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  Stack,
  Input,
  Text,
  ChakraProps,
} from '@chakra-ui/react';

import { IIssueModalData } from '../../../../shared/types/session/issue/issue';

const IssueModal = (props: IIssueModalData): JSX.Element => {
  const { issue: issueData } = props;

  const { isOpen, onClose, activeIssue, changeIssue, addNewIssue } = issueData;

  const { title, link, priority } = activeIssue;

  const setIssueData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const input = e.target;

    changeIssue({ ...activeIssue, [input.name]: input.value });
  };

  const inputStackStyles: ChakraProps = {
    letterSpacing: 2,
    flexDirection: ['column', 'row'],
    alignItems: 'center',
    justifyContent: 'space-evenly',
  };

  const inputLabelStyles: ChakraProps = {
    w: ['100%', '20%'],
    textAlign: ['center', 'start'],
  };

  const inputStyles: ChakraProps = {
    w: ['100%', '60%'],
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Create Issue</ModalHeader>

          <ModalBody mb="20px">
            <Stack justify="space-around" align="stretch">
              <Stack {...inputStackStyles}>
                <Text {...inputLabelStyles}>Title:</Text>
                <Input
                  {...inputStyles}
                  name="title"
                  placeholder="Issue name"
                  value={title}
                  onChange={setIssueData}
                />
              </Stack>
              <Stack {...inputStackStyles}>
                <Text {...inputLabelStyles}>Link:</Text>

                <Input
                  {...inputStyles}
                  name="link"
                  value={link}
                  onChange={setIssueData}
                />
              </Stack>
              <Stack {...inputStackStyles}>
                <Text {...inputLabelStyles}>Priority:</Text>
                <Select
                  {...inputStyles}
                  value={priority}
                  onChange={setIssueData}
                  name="priority"
                  variant="filled"
                  bg="gray.100"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </Select>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup
              colorScheme="facebook"
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Button padding="0 50px" variant="outline" onClick={onClose}>
                No
              </Button>
              <Button onClick={() => addNewIssue(activeIssue)} padding="0 50px">
                Yes
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IssueModal;
