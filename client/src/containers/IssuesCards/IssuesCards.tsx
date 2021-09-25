import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import {
  IIssueModal,
  IIssuesData,
  Issue,
  IStatisticModal,
} from '../../../../shared/types/session/issue/issue';

import IssueCardsView from './IssuesCardsView';
import { ISSUE_PRIORITIES } from '../../../../shared/types/session/issue/issue-priority';

const IssuesCards = (props: IIssuesData): JSX.Element => {
  const {
    issues,
    addNewIssue,
    removeIssue,
    issuesDndChange,
    newIssueId,
    isPlayerDealer,
    gameState,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isStaticticOpen,
    onOpen: openStatistic,
    onClose: closeStatistic,
  } = useDisclosure();

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

  const openStatisticModal = (issueId: number): void => {
    console.log('hellllo', issueId);
    findIssue(issueId);

    openStatistic();
  };

  const setNewIssue = (issue: Issue): void => {
    addNewIssue(issue);

    onClose();
  };

  const changeIssue = (issue: Issue): void => {
    setActiveIssue({ ...issue });
  };

  const statisticModal: IStatisticModal = {
    onOpen: openStatisticModal,
    isOpen: isStaticticOpen,
    onClose: closeStatistic,
    activeIssue,
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
    statisticModal,
    issuesDndChange,
  };

  return <IssueCardsView issues={issues} modal={modalData} />;
};

export default IssuesCards;
