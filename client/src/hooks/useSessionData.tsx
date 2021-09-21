import { useState } from 'react';

import { useAppDispatch } from '../redux/store';
import { updSessState } from '../redux/slices/session';

import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';
import { IIssuesData, Issue } from '../../../shared/types/session/issue/issue';
import { ISessionNameHandling } from '../../../shared/types/session/name';
import {
  IGameStateData,
  ISessionStateClient,
} from '../../../shared/types/session/state/session-state';
import {
  IMemberData,
  IUserCards,
  Member,
} from '../../../shared/types/session/member';
import { DEALER_ID } from '../../../shared/const';
import { USER_ROLES } from '../../../shared/types/user/user-role';
import { ROUND_STATES } from '../../../shared/types/session/round/round-state';
import { ISettings } from '../../../shared/types/settings';
import { SESSION_STAGES } from '../../../shared/types/session/state/stages';
import { ICardsGame } from '../../../shared/types/session/card';

interface ILobbyData {
  sessionNameData: ISessionNameHandling;
  dealerData?: IMemberData;
  membersData: IUserCards;
  issuesData: IIssuesData;
  gameStateData: IGameStateData;

  isPlayerDealer: boolean;
}

const UseSessionData = (
  sessionData: ISessionStateClient,
): ILobbyData | undefined => {
  const dispatch = useAppDispatch();

  const list = sessionData.issues.list;

  const lastIssueId = list[list.length - 1];

  const [newIssueId, setNewIssueId] = useState(
    lastIssueId ? lastIssueId.id + 1 : 1,
  );

  if (sessionData.clientId === undefined) return undefined;

  const dealerInfo = sessionData.members[DEALER_ID] as Member | undefined;

  const setNewSessionName = (newName: string): void => {
    dispatch(updSessState({ name: { value: newName, isSynced: false } }));
  };

  // const changeRoundState = (): void => {
  //   if (sessionData.game) {
  //     dispatch(
  //       updSessState({
  //         game: { ...sessionData.game, roundState: ROUND_STATES.IN_PROCESS },
  //       }),
  //     );
  //   }
  // };

  const isPlayerDealer =
    sessionData.members[sessionData.clientId].userRole === USER_ROLES.DEALER;

  const activeIssueId = sessionData.game
    ? String(sessionData.game.currIssueId)
    : undefined;

  const setActiveIssueId = (id: string): void => {
    if (sessionData.game) {
      console.log(id, '-----');
      dispatch(
        updSessState({ game: { ...sessionData.game, currIssueId: +id } }),
      );
    }
  };

  const findIssueIndex = (id: number): number | null => {
    const issue = list.find(issue => issue.id === id);

    return issue ? list.indexOf(issue) : null;
  };

  const addNewIssue = (issue: Issue): void => {
    const issueIndex = findIssueIndex(issue.id);

    const issues = OBJ_PROCESSOR.deepClone(sessionData.issues.list);

    if (issueIndex !== null) {
      issues[issueIndex] = issue;
    } else {
      issues.push(issue);

      setNewIssueId(newIssueId + 1);
    }

    dispatch(updSessState({ issues: { list: [...issues], isSynced: false } }));

    // if (issues[0]) {
    //   console.log(issues[0]);
    // }

    // console.log(activeIssueId);

    if (issues[0] && activeIssueId !== String(issues[0].id)) {
      setActiveIssueId(String(issues[0].id));
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
    const newSettings = OBJ_PROCESSOR.deepClone(settings);

    dispatch(updSessState({ currentGameSettings: newSettings }));
  };

  const isGameStage = sessionData.stage === SESSION_STAGES.GAME;

  const sessionNameData: ISessionNameHandling = {
    name: sessionData.name,
    changeValue: setNewSessionName,
    isPlayerDealer,
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
    isItYou,
    isGameStage,
    isDealerPlaying: sessionData.currentGameSettings.dealerAsPlayer,
  };

  const issuesData: IIssuesData = {
    issues: sessionData.issues,
    addNewIssue,
    removeIssue,
    newIssueId,
    isPlayerDealer,
    gameState: sessionData.game,
  };

  const gameData: ICardsGame = {
    cards: sessionData.currentGameSettings.cards,
    isGameStage,
    units: sessionData.currentGameSettings.scoreTypeShort,
  };

  const gameStateData: IGameStateData = {
    isPlayerDealer,
    setGameSettings,

    gameState: sessionData.game,
    gameData,
  };

  return {
    sessionNameData,
    dealerData,
    membersData,
    issuesData,
    gameStateData,
    isPlayerDealer,
  };
};

export default UseSessionData;
