import React from 'react';
import { useLocation } from 'react-router';
import { Box } from '@chakra-ui/react';

import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { setSessionName } from '../../redux/slices/session';

import {
  IMemberData,
  IUserCards,
  Member,
} from '../../../../shared/types/session/member';

import GameControlButtons from '../../components/GameControlButtons/GameControlButtons';
import DealerPlate from '../../components/DealerPlate/DealerPlate';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import UserCards from '../../containers/UserCards/UserCards';
import IssueCards from '../../containers/IssuesCards/IssuesCards';
import Settings from '../../containers/Settings/Settings';
import GameCards from '../../containers/GameCards/GameCards';
import JoinGameLink from '../../containers/JoinGameLink/JoinGameLink';
import { ROUND_STATES } from '../../../../shared/types/session/round/round-state';
import {
  IIssuesData,
  Issue,
} from '../../../../shared/types/session/issue/issue';
import { addIssue, deleteIssue } from '../../redux/slices/mockSession';

const Lobby = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const sessionData = useTypedSelector(state => state.mockSession);

  const dealerData = sessionData.members[0];

  const setNewSessionName = (newName: string): void => {
    dispatch(setSessionName({ value: newName, isSynced: false }));
  };

  const addNewIssue = (issue: Issue): void => {
    dispatch(addIssue(issue));
  };

  const removeIssue = (id: number): void => {
    dispatch(deleteIssue(id));
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

  console.log(sessionData);

  const dealerInfo: IMemberData = {
    member: dealerData,
    isItYou: isItYou(dealerData),
    isRoundStarted: isRoundStarted(),
  };

  const membersData: IUserCards = {
    members: sessionData.members,
    findWhoIsUser: isItYou,
    isRoundStarted: isRoundStarted(),
  };

  const issuesData: IIssuesData = {
    issues: sessionData.issues,
    addNewIssue: addNewIssue,
    removeIssue: removeIssue,
  };

  return (
    <Box minH="100vh" maxW="1440px" w="90%" m="0 auto" p="5px">
      <EditableHeader
        topic={sessionData.name.value}
        changeTopic={setNewSessionName}
      />
      <DealerPlate data={dealerInfo} />
      <JoinGameLink link={`${location.pathname}`} />
      <GameControlButtons />
      <UserCards cardsData={membersData} />
      <IssueCards {...issuesData} />
      <Settings {...sessionData.currentGameSettings} />
      <GameCards />
    </Box>
  );
};

export default Lobby;
