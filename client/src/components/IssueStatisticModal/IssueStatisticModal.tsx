import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link,
  Text,
  Select,
  Stack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { IStatisticModal } from '../../../../shared/types/session/issue/issue';

import RoundStatistics from '../RoundStatistics/RoundStatistics';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';

const IssueStatisticModal = (props: IStatisticModal): JSX.Element => {
  const { isOpen, onClose, activeIssue, settings, changeIssue, addNewIssue } =
    props;

  const { link, stat, title, value } = activeIssue;

  console.log(settings);

  console.log(activeIssue);

  // if(!activeIssue.)

  // const card = gameCards.find(
  //   card => card.value === activeIssue.stat?.votes[0],
  // );

  const setIssueValue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const select = e.target;

    const issue = OBJ_PROCESSOR.deepClone({
      ...activeIssue,
      [select.name]: select.value,
    });

    changeIssue(issue);

    addNewIssue(issue);
  };

  const votes = activeIssue.stat ? Object.values(activeIssue.stat.votes) : [];

  const renderStatistic = (): JSX.Element => {
    return stat ? (
      <RoundStatistics issueTitle={title} votes={stat.votes} /> //TODO Kaesid: прокинуть  settings в GameCardStatistics
    ) : (
      <Text textAlign="center">Voting has not concluded. </Text>
    );
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Issue's Data:</ModalHeader>
        <ModalCloseButton />

        <ModalBody p="3vw">
          {link && (
            <Link textAlign="center" href={link} mb="10px" isExternal>
              Issue description: <ExternalLinkIcon mx="2px" />
            </Link>
          )}
          {!!votes.length && (
            <Stack
              direction="row"
              justify="center"
              spacing={5}
              align="center"
              wrap="wrap"
              mb="20px"
            >
              <Text>Select issue`s value:</Text>
              <Select
                maxW="200px"
                value={value}
                name="value"
                onChange={setIssueValue}
              >
                {votes.map(vote => (
                  <option key={vote} value={vote}>
                    {vote}
                  </option>
                ))}
              </Select>
            </Stack>
          )}
          {renderStatistic()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IssueStatisticModal;
