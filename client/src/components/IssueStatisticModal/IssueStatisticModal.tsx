import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { IStatisticModal } from '../../../../shared/types/session/issue/issue';
import { ICardsStatistic } from '../../../../shared/types/session/card';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import { StatisticsSliderSettings } from '../../helpers/swiperSettings';

import {
  IStatisticsTableProps,
  StatisticsTable,
} from '../StatisticsTable/StatisticsTable';
import GameCardValueButtons from '../../containers/GameCardValueButtons/GameCardValueButtons';

const IssueStatisticModal = (props: IStatisticModal): JSX.Element => {
  const {
    isOpen,
    onClose,
    activeIssue,
    settings,
    changeIssue,
    addNewIssue,
    gameState,
    isPlayerDealer,
  } = props;

  if (!gameState) return <></>;

  const { link, stat, value } = activeIssue;

  const { cards, scoreTypeShort: units } = settings;

  const setIssueValue = (value: string): void => {
    const issue = OBJ_PROCESSOR.deepClone({
      ...activeIssue,
      value: value,
    });

    changeIssue(issue);

    addNewIssue(issue);
  };

  const renderStats = (): JSX.Element => {
    if (!stat) {
      return <Text textAlign="center">Voting has not concluded. </Text>;
    }

    const statisticData: IStatisticsTableProps = {
      issues: [activeIssue],
      cards,
      units,
      statCardsSettings: StatisticsSliderSettings,
    };

    return <StatisticsTable {...statisticData} />;
  };

  const chooseValueData: ICardsStatistic = {
    setIssueValue,
    cards,
    units,
    value,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
      motionPreset="slideInBottom"
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Issue's Data:</ModalHeader>
        <ModalCloseButton />

        <ModalBody w="100%" p="10px">
          {link && (
            <Stack
              w="100%"
              direction="row"
              justify="center"
              spacing={5}
              align="center"
              mb="20px"
            >
              <a href={link} target="_blank" rel="noreferrer">
                Issue description: <ExternalLinkIcon mx="2px" />
              </a>
            </Stack>
          )}
          {isPlayerDealer && (
            <Stack
              w="100%"
              direction="column"
              justify="center"
              spacing={5}
              align="center"
              mb="20px"
            >
              <Text mb="10px">Select issue`s value:</Text>
              <GameCardValueButtons {...chooseValueData} />
            </Stack>
          )}
          {renderStats()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IssueStatisticModal;
