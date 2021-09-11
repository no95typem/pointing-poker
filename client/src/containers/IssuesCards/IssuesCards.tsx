import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import {
  IIssueModal,
  Issue,
} from '../../../../shared/types/session/issue/issue';

import IssueCardView from './IssuesCardsView';

const IssuesCards = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const issue1: Issue = {
    id: '1',
    title: 'a',
    link: 'www.a.com',
    priority: 'MEDIUM',
    pos: 1,
    isSynced: true,
    closed: false,
  };

  const issue2: Issue = {
    ...issue1,
    id: '2',
    title: 'b',
    pos: 2,
    priority: 'HIGH',
  };

  const [issue, setIssue] = useState<Issue>();

  //! временные хуки, для визуализации. В будущем будет реализовано через стор.
  const issues = [issue1, issue2];

  //!

  const createIssue = (issueId?: string): void => {
    if (issueId) {
      console.log("load issues's data= ", issueId);

      setIssue(issues.find(issue => issue.id === issueId));
    } else {
      setIssue(undefined);
    }

    onOpen();
  };

  const modalData: IIssueModal = {
    onClose: onClose,
    isOpen: isOpen,
    onClick: createIssue,
  };

  return <IssueCardView issues={issues} modal={modalData} editIssue={issue} />;
};

export default IssuesCards;
