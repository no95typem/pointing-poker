import React from 'react';

import { Stack, Heading, Text } from '@chakra-ui/react';

import { useTypedSelector } from '../../redux/store';

interface Props {
  name: string;
  stat: {
    count: number;
    membersIds: number[];
  };
  quantityVoters: number;
}

const GameCardStatistics = (data: Props): JSX.Element => {
  const { name, stat, quantityVoters } = data;

  const localSettings = useTypedSelector(state => state.settings);

  const { cards, scoreTypeShort } = localSettings;

  const currentCard = cards.find(card => card.value === name);

  const percent = (stat.count / quantityVoters) * 100;

  return (
    <Stack direction="column" spacing="1rem">
      <Stack
        position="relative"
        w="150px"
        height="210px"
        direction="column"
        justify="center"
        align="center"
        p="10px 10px"
        boxShadow="lg"
      >
        <Text
          fontSize="2xl"
          maxW="130px"
          fontStyle="italic"
          fontWeight="bold"
          isTruncated
          mb="20px"
        >
          {name}
        </Text>
        {currentCard?.base64 ? (
          // img src={base64}
          <Heading fontStyle="italic" size="lg">
            {currentCard.base64}
          </Heading>
        ) : (
          <Heading fontStyle="italic" size="lg">
            {scoreTypeShort}
          </Heading>
        )}
      </Stack>
      <Text>{`${percent}%`}</Text>
    </Stack>
  );
};

export default GameCardStatistics;
