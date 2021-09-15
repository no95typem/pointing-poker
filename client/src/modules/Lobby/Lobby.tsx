import React from 'react';
import { Box } from '@chakra-ui/react';

import { useAppDispatch, useTypedSelector } from '../../redux/store';

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
import { updSessState } from '../../redux/slices/session';

const Lobby = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const sessionData = useTypedSelector(state => state.session);

  const dealerData = sessionData.members[0];

  const setNewSessionName = (newName: string): void => {
    dispatch(updSessState({ name: { value: newName, isSynced: false } }));
  };

  const isItYou = (member: Member) => {
    return sessionData.clientId === member.userSessionPublicId;
  };

  const isRoundStarted = (): boolean => {
    return !!sessionData.game && sessionData.game.roundState === 'IN_PROCESS';
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

  console.log(membersData);

  return (
    <Box minH="100vh" maxW="1440px" w="90%" m="0 auto" p="5px">
      <EditableHeader
        topic={sessionData.name.value}
        changeTopic={setNewSessionName}
      />
      <DealerPlate data={dealerInfo} />
      <JoinGameLink link={`${window.location}`} />
      <GameControlButtons />
      <UserCards cardsData={membersData} />
      <IssueCards />
      <Settings />
      <GameCards />
    </Box>
  );
};

export default Lobby;
