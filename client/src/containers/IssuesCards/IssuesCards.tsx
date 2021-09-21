import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import {
  IIssueModal,
  IIssuesData,
  Issue,
} from '../../../../shared/types/session/issue/issue';

import IssueCardsView from './IssuesCardsView';
import { ISSUE_PRIORITIES } from '../../../../shared/types/session/issue/issue-priority';

const IssuesCards = (props: IIssuesData): JSX.Element => {
  const {
    issues,
    addNewIssue,
    removeIssue,
    newIssueId,
    isPlayerDealer,
    gameState,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const newIssue: Issue = {
    id: newIssueId,
    title: '',
    link: '',
    priority: ISSUE_PRIORITIES.LOW,
    isSynced: false,
    closed: false,
  };

  const [activeIssue, setActiveIssue] = useState<Issue>(newIssue);

  const findIssue = (issueId?: number): void => {
    const editIssue = issues.list.find(issue => issue.id === issueId);

    setActiveIssue(editIssue ? editIssue : newIssue);
  };

  const openModal = (issueId?: number): void => {
    findIssue(issueId);

    onOpen();
  };

  const setNewIssue = (issue: Issue): void => {
    addNewIssue(issue);

    onClose();
  };

  const changeIssue = (issue: Issue): void => {
    setActiveIssue({ ...issue });
  };

  const modalData: IIssueModal = {
    onClose,
    isOpen,
    openModal,
    activeIssue,
    addNewIssue: setNewIssue,
    changeIssue,
    removeIssue,
    isPlayerDealer,
    gameState,
  };

  return <IssueCardsView issues={issues} modal={modalData} />;
};

export default IssuesCards;
