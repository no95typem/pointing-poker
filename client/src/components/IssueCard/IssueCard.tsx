import React from 'react';

import {
  Stack,
  IconButton,
  Stat,
  StatNumber,
  StatHelpText,
  Text,
} from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { CloseIcon } from '@chakra-ui/icons';

import { IIssueData } from '../../../../shared/types/session/issue/issue';
import GameCard from '../GameCard/GameCard';

const IssueCard = (props: IIssueData): JSX.Element => {
  const {
    issue,
    openModal,
    removeIssue,
    isPlayerDealer,
    openStatisticModal,
    settings,
  } = props;

  const { cards, scoreTypeShort } = settings;

  const { id, title, priority, isSynced, closed, value } = issue;

  const isEditable = isPlayerDealer && isSynced && !closed;

  const showIssueStatistic = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!openStatisticModal) return;

    const isButton = e.nativeEvent
      .composedPath()
      .some(el => el instanceof HTMLButtonElement);

    if (!isButton) {
      openStatisticModal(id);
    }
  };

  const renderVotingCard = (): JSX.Element => {
    const votingCard = cards.find(card => card.value === value);

    if (!votingCard) return <></>;

    return (
      <GameCard
        card={votingCard}
        size="xs"
        units={scoreTypeShort}
        isUnitsHidden={true}
      />
    );
  };

  return (
    <Stack
      direction="row"
      align="center"
      p="10px"
      h="70px"
      boxShadow="lg"
      cursor={openStatisticModal ? 'pointer' : 'unset'}
      onClick={showIssueStatistic}
    >
      <Stack w="100%" direction="row" justify="space-between" align="center">
        <Stat>
          <StatNumber fontSize="lg" isTruncated={true}>
            {title}
          </StatNumber>
          <StatHelpText fontSize="xs" mb="0">
            {priority}
          </StatHelpText>
        </Stat>
        {value ? (
          renderVotingCard()
        ) : (
          <Text
            maxW="100px"
            isTruncated
            fontSize="xl"
            fontFamily="fantasy"
            p="0 5px"
          >
            -
          </Text>
        )}
      </Stack>

      {isEditable && (
        <IconButton
          aria-label="edit"
          background="transparent"
          size="lg"
          icon={<ImPencil />}
          onClick={() => openModal(id)}
        />
      )}
      {isEditable && (
        <IconButton
          aria-label="delete"
          background="transparent"
          size="lg"
          icon={<CloseIcon />}
          onClick={() => removeIssue(id)}
        />
      )}
    </Stack>
  );
};

export default IssueCard;
