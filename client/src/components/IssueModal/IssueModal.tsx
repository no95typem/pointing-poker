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
  const { issue } = props;

  const { isOpen, onClose, editIssue } = issue;

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
                    placeholder="Issue name"
                    defaultValue={editIssue ? editIssue.title : ''}
                  />
                </Stack>
              </FormControl>
              <FormControl id="link" isRequired>
                <Stack spacing={2} direction="row" align="center">
                  <FormLabel htmlFor="link">Link:</FormLabel>
                  <Input defaultValue={editIssue ? editIssue.link : ''} />
                </Stack>
              </FormControl>
              <Stack spacing={2} direction="row" align="center">
                <FormLabel>Priority:</FormLabel>
                <Select
                  defaultValue={editIssue ? editIssue.priority : ''}
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
              <Button padding="0 50px">Yes</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IssueModal;
