import { Box, Heading } from '@chakra-ui/react';

import GameCardStatistics from '../GameCardStatistics/GameCardStatistics';
import { calcPercentage } from '../../../../shared/helpers/calcs/game-calcs';
import Slider from 'react-slick';
import { gameCardsSettings } from '../../helpers/swiperSettings';

export interface IRoundStatistics {
  issueTitle: string;
  votes: Record<number, string | undefined>;
}

const RoundStatistics = (props: IRoundStatistics): JSX.Element => {
  const { votes } = props;

  const allPlayersCount = Object.entries(votes).length;

  return (
    <Box>
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
      <Box p="5px">
        <Slider {...gameCardsSettings}>
          {Object.entries(calcPercentage(votes)).map(([cardValue, pctRec]) => {
            return (
              <Box maxW="320px" key={`${cardValue}-box`}>
                <GameCardStatistics
                  cardValue={cardValue}
                  pct={pctRec}
                  allPlayersCount={allPlayersCount}
                  key={cardValue}
                />
              </Box>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
};

export default RoundStatistics;
