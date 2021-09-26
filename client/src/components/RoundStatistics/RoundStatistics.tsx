import { Box, Heading, Stack } from '@chakra-ui/react';

import GameCardStatistics from '../GameCardStatistics/GameCardStatistics';
import { calcPercentage } from '../../../../shared/helpers/calcs/game-calcs';

export interface IRoundStatistics {
  issueTitle: string;
  votes: Record<number, string | undefined>;
}

const RoundStatistics = (props: IRoundStatistics): JSX.Element => {
  const { votes } = props;

  const allPlayersCount = Object.entries(votes).length;

  return (
    <Box mb="30px">
      <Heading textAlign="center" textTransform="uppercase" mb="20px" size="md">
        {props.issueTitle ? props.issueTitle : 'Statistics:'}
      </Heading>

      <Stack w="100%" wrap="wrap" direction="row">
        {Object.entries(calcPercentage(votes)).map(([cardValue, pctRec]) => {
          return (
            <GameCardStatistics
              cardValue={cardValue}
              pct={pctRec}
              allPlayersCount={allPlayersCount}
              key={cardValue}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default RoundStatistics;
