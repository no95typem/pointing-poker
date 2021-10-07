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
import { addNotifRec, INotification } from '../../redux/slices/notifications';
import { store } from '../../redux/store';

const IssuesCards = (
  props: IIssuesData & { justifyTabs?: 'start' | 'center' },
): JSX.Element => {
  const {
    issues,
    addNewIssue,
    removeIssue,
    issuesDndChange,
    newIssueId,
    isPlayerDealer,
    gameState,
    settings,
    userId,
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
    findIssue(issueId);

    openStatistic();
  };

  const setNewIssue = (issue: Issue): void => {
    if (!issue.title) {
      const notification: INotification = {
        status: 'error',
        text: `Title can't be empty!`,
        needToShow: true,
      };

      store.dispatch(addNotifRec(notification));

      return;
    }
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
    settings,
    changeIssue,
    addNewIssue: setNewIssue,
    gameState,
    isPlayerDealer,
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
    userId,
  };

  return (
    <IssueCardsView
      issues={issues}
      modal={modalData}
      justifyTabs={props.justifyTabs}
    />
  );
};

export default IssuesCards;
