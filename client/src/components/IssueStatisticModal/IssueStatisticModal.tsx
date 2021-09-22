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
} from '@chakra-ui/react';
import { IStatisticModal } from '../../../../shared/types/session/issue/issue';
import RoundStatistics from '../RoundStatistics/RoundStatistics';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const IssueStatisticModal = (props: IStatisticModal): JSX.Element => {
  const { isOpen, onClose, activeIssue } = props;

  const { link, stat, title } = activeIssue;

  const renderStatistic = (): JSX.Element => {
    return stat ? (
      <RoundStatistics issueTitle={title} votes={stat.votes} />
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

          {renderStatistic()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IssueStatisticModal;
