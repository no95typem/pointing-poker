import React from 'react';
import { Table, Tbody, Thead, Tr, Th, Td } from '@chakra-ui/table';
import { Issue } from '../../../../shared/types/session/issue/issue';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { CardData } from '../../../../shared/types/session/card';
import { RoundStat } from '../../../../shared/types/session/round/round-stat';
import GameCard from '../GameCard/GameCard';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

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

  return (
    <HStack>
      {pctEntries
        .sort((a, b) => b[1].count - a[1].count)
        .map(([cardVal, rec]) => {
          const cardData = cards.find(card => card.value === cardVal);

          const percent = ((rec.count / votesCount) * 100).toFixed(0);

          return (
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
                  isGameStage
                  size="xs"
                  isUnitsHidden
                />
              ) : (
                <QuestionOutlineIcon />
              )}
              <Text fontWeight="bold">{`${percent}%`}</Text>
            </Flex>
          );
        })}
    </HStack>
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
                <Tr
                  key={issue.id}
                  display="flex"
                  height="80px"
                  overflow="hidden"
                >
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
