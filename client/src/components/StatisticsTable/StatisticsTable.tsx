import React from 'react';
import { Table, Tbody, Thead, Tr, Th, Td } from '@chakra-ui/table';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import Slider, { Settings } from 'react-slick';

import { Issue } from '../../../../shared/types/session/issue/issue';
import { CardData } from '../../../../shared/types/session/card';
import { RoundStat } from '../../../../shared/types/session/round/round-stat';

import GameCard from '../GameCard/GameCard';
import SliderCustomArrow from '../SliderCustomArrow/SliderCustomArrow';
import { UNKNOWN_CARD_DATA } from '../../presets';

const statCardsSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  nextArrow: <SliderCustomArrow />,
  prevArrow: <SliderCustomArrow />,

  responsive: [
    {
      breakpoint: 1360,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const renderStat = (props: {
  stat: RoundStat;
  cards: CardData[];
  units: string;
  statCardsSettings?: Settings;
}) => {
  const { stat, cards, units } = props;

  const votesCount = Object.keys(stat.votes).length;

  const pctEntries = Object.entries(stat.pct);

  const sliderProps = props.statCardsSettings || statCardsSettings;

  return (
    <Box w="90%" p="5px">
      <Slider {...sliderProps}>
        {/* {Array(10)
          .fill(null)
          .map(() => {
            return  */}
        {pctEntries
          .sort((a, b) => b[1].count - a[1].count)
          .map(([cardVal, rec]) => {
            const cardData = cards.find(card => card.value === cardVal);

            const percent = ((rec.count / votesCount) * 100).toFixed(0);

            return (
              <Box key={cardVal} px={5}>
                <Flex
                  h="min-content"
                  direction="column"
                  justify="center"
                  align="center"
                  gridGap="1"
                  w="fit-content"
                >
                  <GameCard
                    card={cardData || UNKNOWN_CARD_DATA}
                    units={units}
                    size="xs"
                    isUnitsHidden
                  />
                  <Text fontWeight="bold">{`${percent}%`}</Text>
                </Flex>
              </Box>
            );
          })}
      </Slider>
    </Box>
  );
};

export interface IStatisticsTableProps {
  issues: Issue[];
  cards: CardData[];
  units: string;
  statCardsSettings?: Settings;
}

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
              <Th w="2px"></Th>
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
                      maxH="80px"
                      mt="auto"
                      mb="auto"
                    >
                      {issue.title}
                    </Text>
                  </Td>
                  <Td w="2px"></Td>
                  <Td display="flex" alignItems="center" w="50%" p="0px 16px">
                    {issue.stat
                      ? renderStat({
                          stat: issue.stat,
                          ...props,
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
