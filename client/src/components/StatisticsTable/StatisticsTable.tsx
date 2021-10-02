import React from 'react';
import { Table, Tbody, Thead, Tr, Th, Td } from '@chakra-ui/table';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import Slider from 'react-slick';

import { Issue } from '../../../../shared/types/session/issue/issue';
import { CardData } from '../../../../shared/types/session/card';
import { RoundStat } from '../../../../shared/types/session/round/round-stat';

import GameCard from '../GameCard/GameCard';
import SliderCustomArrow from '../SliderCustomArrow/SliderCustomArrow';

export interface IStatisticsTableProps {
  issues: Issue[];
  cards: CardData[];
  units: string;
}

const renderStat = (props: {
  stat: RoundStat;
  cards: CardData[];
  units: string;
}) => {
  const { stat, cards, units } = props;

  const votesCount = Object.keys(stat.votes).length;

  const pctEntries = Object.entries(stat.pct);

  const statCardsSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SliderCustomArrow />,
    prevArrow: <SliderCustomArrow />,

    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box maxW="28vw" p="5px">
      <Slider {...statCardsSettings}>
        {pctEntries
          .sort((a, b) => b[1].count - a[1].count)
          .map(([cardVal, rec]) => {
            const cardData = cards.find(card => card.value === cardVal);

            const percent = ((rec.count / votesCount) * 100).toFixed(0);

            return (
              <Box key={`${cardVal}-box`}>
                <Flex
                  key={cardVal}
                  h="min-content"
                  direction="column"
                  justify="center"
                  align="center"
                  gridGap="1"
                >
                  {cardData ? (
                    <GameCard
                      card={cardData}
                      units={units}
                      size="xs"
                      isUnitsHidden
                    />
                  ) : (
                    <QuestionOutlineIcon />
                  )}
                  <Text fontWeight="bold">{`${percent}%`}</Text>
                </Flex>
              </Box>
            );
          })}
      </Slider>
    </Box>
  );
};

export const StatisticsTable = React.memo(
  (props: IStatisticsTableProps): JSX.Element => {
    return (
      <Box w="100%" maxH="100%" overflow="auto">
        <Table
          variant="simple"
          size="sm"
          textAlign="center"
          w="100%"
          style={{ tableLayout: 'fixed' }}
        >
          <Thead>
            <Tr display="flex">
              <Th display="block" w="40%">
                Issue:
              </Th>
              <Th w="10%"></Th>
              <Th display="block" w="50%">
                Stats:
              </Th>
            </Tr>
          </Thead>
          <Tbody w="100%">
            {props.issues.map(issue => {
              return (
                <Tr key={issue.id} display="flex" overflow="hidden">
                  <Td display="flex" w="40%" alignItems="flex-start">
                    <Text
                      maxW="90%"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      h="min-content"
                      maxH="100%"
                      mt="auto"
                      mb="auto"
                    >
                      {issue.title}
                    </Text>
                  </Td>
                  <Td w="10%"></Td>
                  <Td display="flex" alignItems="center" w="50%" p="0px 16px">
                    {issue.stat
                      ? renderStat({
                          stat: issue.stat,
                          cards: props.cards,
                          units: props.units,
                        })
                      : 'no stat'}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    );
  },
);
