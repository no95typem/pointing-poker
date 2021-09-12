import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';

import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import DealerPlate from '../../components/DealerPlate/DealerPlate';
import { member1 } from '../../containers/UserCards/userCardsTemplateData';
import { IMemberData } from '../../../../shared/types/session/member';
import UserCards from '../../containers/UserCards/UserCards';
import IssueCards from '../../containers/IssuesCards/IssuesCards';
import Settings from '../../containers/Settings/Settings';
import GameCards from '../../containers/GameCards/GameCards';

const Lobby = (): JSX.Element => {
  const [topic, setTopic] = useState('Session 0.0.1');

  const changeTopic = (newTopic: string): void => {
    setTopic(newTopic);
  };

  // const { issue, onClick } = props;

  // const { id, title, priority } = issue as Issue;

  const memberData: IMemberData = {
    // Заглушка. В будущем просто взять dealer из userState
    member: member1,
    isItYou: true,
    kickPlayer: () => {},
  };

  return (
    <Box minH="100vh" w="90%" m="0 auto" p="5px">
      <EditableHeader topic={topic} changeTopic={changeTopic} />
      <DealerPlate data={memberData} />
      <UserCards />
      <IssueCards />
      <Settings />
      <GameCards />
    </Box>
  );
};

export default Lobby;
