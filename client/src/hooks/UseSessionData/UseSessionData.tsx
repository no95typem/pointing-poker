import { useState } from 'react';

import { useAppDispatch } from '../../redux/store';
import { updSessState } from '../../redux/slices/session';

import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import { ISettings } from '../../../../shared/types/settings';
import {
  IIssuesData,
  Issue,
} from '../../../../shared/types/session/issue/issue';
import { ISessionNameHandling } from '../../../../shared/types/session/name';
import { ISessionStateClient } from '../../../../shared/types/session/state/session-state';
import {
  IMemberData,
  IUserCards,
  Member,
} from '../../../../shared/types/session/member';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { DEALER_ID } from '../../../../shared/const';

interface ILobbyData {
  sessionNameData: ISessionNameHandling;
  dealerData?: IMemberData;
  membersData: IUserCards;
  issuesData: IIssuesData;
  settingsData: ISettingsData;
  isPlayerDealer: boolean;
}

export interface ISettingsData {
  // settings: ISettings;
  setGameSettings: (settings: ISettings) => void;
}

const UseSessionData = (
  sessionData: ISessionStateClient,
): ILobbyData | undefined => {
  const dispatch = useAppDispatch();

  const [newIssueId, setNewIssueId] = useState(1);

  if (sessionData.clientId === undefined) return undefined;

  const dealerInfo = sessionData.members[DEALER_ID] as Member | undefined;

  const setNewSessionName = (newName: string): void => {
    dispatch(updSessState({ name: { value: newName, isSynced: false } }));
  };

  const isPlayerDealer =
    sessionData.members[sessionData.clientId].userRole === USER_ROLES.DEALER;

  const findIssueIndex = (id: number): number | null => {
    const list = sessionData.issues.list;

    const issue = list.find(issue => issue.id === id);

    return issue ? list.indexOf(issue) : null;
  };

  const addNewIssue = (issue: Issue): void => {
    const issueIndex = findIssueIndex(issue.id);

    const issues = OBJ_PROCESSOR.deepClone(sessionData.issues.list);

    if (issueIndex !== null) {
      issues[issueIndex] = issue;

      dispatch(
        updSessState({ issues: { list: [...issues], isSynced: false } }),
      );
    } else {
      dispatch(
        updSessState({ issues: { list: [...issues, issue], isSynced: false } }),
      );

      setNewIssueId(newIssueId + 1);
    }
  };

  const removeIssue = (id: number): void => {
    const issueIndex = findIssueIndex(id);

    const issues = OBJ_PROCESSOR.deepClone(sessionData.issues.list);

    if (issueIndex !== null) {
      issues.splice(issueIndex, 1);

      dispatch(
        updSessState({ issues: { list: [...issues], isSynced: false } }),
      );
    }
  };

  const isItYou = (member: Member) => {
    return sessionData.clientId === member.userSessionPublicId;
  };

  const isRoundStarted = (): boolean => {
    return (
      !!sessionData.game &&
      sessionData.game.roundState === ROUND_STATES.IN_PROCESS
    );
  };

  const setGameSettings = (settings: ISettings): void => {
    dispatch(updSessState({ currentGameSettings: settings }));
  };

  const sessionNameData: ISessionNameHandling = {
    name: sessionData.name,
    changeValue: setNewSessionName,
    isPlayerDealer: isPlayerDealer,
  };

  const dealerData: IMemberData | undefined = dealerInfo
    ? {
        member: dealerInfo,
        isItYou: isItYou(dealerInfo),
        isRoundStarted: isRoundStarted(),
      }
    : undefined;

  const membersData: IUserCards = {
    members: sessionData.members,
    findWhoIsUser: isItYou,
    isRoundStarted: isRoundStarted(),
  };

  const issuesData: IIssuesData = {
    issues: sessionData.issues,
    addNewIssue: addNewIssue,
    removeIssue: removeIssue,
    newIssueId: newIssueId,
    isPlayerDealer: isPlayerDealer,
  };

  const settingsData: ISettingsData = {
    // settings: sessionData.currentGameSettings,

    //! чтобы засетать настройки в стэйт на старт игры.
    setGameSettings: setGameSettings,
  };

  return {
    sessionNameData,
    dealerData,
    membersData,
    issuesData,
    settingsData,
    isPlayerDealer,
  };
};

export default UseSessionData;
