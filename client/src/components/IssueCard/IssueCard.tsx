import React from 'react';

import {
  IconButton,
  Stat,
  StatNumber,
  StatHelpText,
  Text,
  Flex,
  useColorMode,
} from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { CloseIcon } from '@chakra-ui/icons';

import { IIssueData } from '../../../../shared/types/session/issue/issue';
import GameCard from '../GameCard/GameCard';
import styles from './styles.module.scss';

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

  const cMode = useColorMode();

  return (
    <Flex
      w="100%"
      justify="space-between"
      align="center"
      h="70px"
      boxShadow="lg"
      cursor={openStatisticModal ? 'pointer' : 'unset'}
      onClick={showIssueStatistic}
      border="1px solid"
      borderRadius="md"
      overflow="hidden"
      borderColor={cMode.colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.200'}
      opacity={issue.closed ? '0.7' : '1'}
      _hover={{ opacity: '1' }}
      className={`enlight ${styles.enlight}`}
      backgroundColor={cMode.colorMode === 'dark' ? 'gray.800' : 'gray.100'}
    >
      <Stat w="calc(100% - 90px)" textAlign="start" p="5px 5px 5px 10px">
        <StatNumber fontSize="lg" w="100%" isTruncated={true}>
          {title}
        </StatNumber>
        <StatHelpText fontSize="xs" mb="0">
          {priority}
        </StatHelpText>
      </Stat>
      <Flex w="50px" justify="center" align="center">
        {value ? (
          renderVotingCard()
        ) : (
          <Text
            w="100%"
            textAlign="center"
            isTruncated
            fontSize="xl"
            fontFamily="fantasy"
          >
            -
          </Text>
        )}
      </Flex>
      {isEditable && (
        <Flex
          h="100%"
          w="fit-content"
          direction="column"
          justifyContent="space-between"
          p={2}
          gridGap={0.25}
        >
          <IconButton
            aria-label="edit"
            background="transparent"
            size="xs"
            icon={<ImPencil />}
            onClick={() => openModal(id)}
          />{' '}
          <IconButton
            aria-label="delete"
            background="transparent"
            size="xs"
            icon={<CloseIcon />}
            onClick={() => removeIssue(id)}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default IssueCard;
