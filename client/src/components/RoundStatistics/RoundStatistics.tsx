import React from 'react';
import { UNDEFINED_CARD_VALUE } from '../../../../shared/const';
import { Box, Heading, Stack } from '@chakra-ui/react';

import { Percentage } from '../../../../shared/types/session/round/round-stat';

import GameCardStatistics from '../GameCardStatistics/GameCardStatistics';

export interface IRoundStatistics {
  issueTitle: string;
  votes: Record<number, string | undefined>;
}

const RoundStatistics = (props: IRoundStatistics): JSX.Element => {
  const { votes } = props;

  const percentage: Percentage = {};

  const quantityVoters = Object.entries(votes).length;

  Object.entries(votes).forEach(([memberId, value]) => {
    const key = value || UNDEFINED_CARD_VALUE;

    const data = percentage[key];

    if (!data) {
      percentage[key] = {
        count: 1,
        membersIds: [+memberId],
      };
    } else {
      data.count++;
      data.membersIds = [...data.membersIds, +memberId];
    }
  });

  return (
    <Box mb="30px">
      <Heading
        textAlign="center"
        mb="10px"
        as="h2"
        size="lg"
        textTransform="uppercase"
        fontFamily="handwrite"
      >
        {props.issueTitle ? props.issueTitle : 'Statistics:'}
      </Heading>

      <Stack w="100%" wrap="wrap" direction="row" justify="center">
        {Object.entries(percentage).map(([name, stat]) => {
          const data = {
            name,
            stat,
            quantityVoters,
          };

          return <GameCardStatistics {...data} key={name} />;
        })}
      </Stack>
    </Box>
  );
};

export default RoundStatistics;
