import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import {
  IIssueModal,
  Issue,
} from '../../../../shared/types/session/issue/issue';

import IssueCardsView from './IssuesCardsView';

const IssuesCards = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const issue1: Issue = {
    id: '1',
    title: 'Isssue 123',
    link: 'www.a.com/123',
    priority: 'MEDIUM',
    pos: 1,
    isSynced: true,
    closed: false,
  };

  const issue2: Issue = {
    ...issue1,
    id: '2',
    title: 'Issue 45',
    link: 'www.a.com/45',
    priority: 'HIGH',
  };

  const [editIssue, setEditIssue] = useState<Issue>();

  const issues = [issue1, issue2];

  const openModal = (issueId?: string): void => {
    setEditIssue(issues.find(issue => issue.id === issueId));

    onOpen();
  };

  const modalData: IIssueModal = {
    onClose: onClose,
    isOpen: isOpen,
    onClick: openModal,
    editIssue: editIssue,
  };

  return <IssueCardsView issues={issues} modal={modalData} />;
};

export default IssuesCards;
