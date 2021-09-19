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
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import { IIssueModalData } from '../../../../shared/types/session/issue/issue';

const IssueModal = (props: IIssueModalData): JSX.Element => {
  const { issue: issueData } = props;

  const { isOpen, onClose, activeIssue, changeIssue, addNewIssue } = issueData;

  const seIssueData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const input = e.target;

    changeIssue({ ...activeIssue, [input.name]: input.value });
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Issue</ModalHeader>

          <ModalBody mb="20px">
            <Stack d="flex" justify="space-around" align="stretch">
              <FormControl id="title" isRequired>
                <Stack spacing={2} direction="row" align="center">
                  <FormLabel>Title:</FormLabel>
                  <Input
                    name="title"
                    placeholder="Issue name"
                    value={activeIssue.title}
                    onChange={seIssueData}
                  />
                </Stack>
              </FormControl>
              <FormControl id="link">
                <Stack spacing={2} direction="row" align="center">
                  <FormLabel htmlFor="link">Link:</FormLabel>
                  <Input
                    name="link"
                    value={activeIssue.link}
                    onChange={seIssueData}
                  />
                </Stack>
              </FormControl>
              <Stack spacing={2} direction="row" align="center">
                <FormLabel>Priority:</FormLabel>
                <Select
                  value={activeIssue.priority}
                  onChange={seIssueData}
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
