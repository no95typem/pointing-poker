import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { ReactComponent as UndrawEmpty } from '../../assets/images/undraw/empty.svg';
import { ReactComponent as UndrawStatistics } from '../../assets/images/undraw/statistics.svg';
import { ReactComponent as UndrawProgressDataMod } from '../../assets/images/undraw/progress-data-mod.svg';

import { FIXED_BUTTON_WIDTH, MAX_CONTENT_WIDTH } from '../../constants';
import { useTypedSelector } from '../../redux/store';
import { dang_APP_SOFT_RESET } from '../../redux/store-soft-reset';
import useSessionData from '../../hooks/useSessionData';
import { renderSelfRemovingElement } from '../../helpers/renderSelfRemovingElement';

import { ImportExportResultsModal } from '../../containers/ImportExportResultsModal/ImportExportResultsModal';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import { StatisticsTable } from '../../components/StatisticsTable/StatisticsTable';

const Statistics = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const [isLargerThan575] = useMediaQuery('(min-width: 575px)');

  const sessionNameData = useSessionData(session)?.sessionNameData;

  const issuesList = session.issues.list;

  const isIssueWithStat = issuesList.some(iss => iss.stat);

  return (
    <Flex
      maxW={MAX_CONTENT_WIDTH}
      w="100%"
      h="100%"
      direction="column"
      justifyContent="flex-start"
      align="center"
      position="relative"
    >
      {isIssueWithStat && (
        <Box
          position="absolute"
          bottom="0px"
          right="10px"
          height="auto"
          w="100px"
          zIndex="1"
          opacity="0.9"
        >
          <UndrawProgressDataMod />
        </Box>
      )}

      {sessionNameData ? <EditableHeader {...sessionNameData} /> : <Box />}

      <Flex
        gridGap="4"
        p={4}
        w="90%"
        justify={isLargerThan575 ? 'flex-end' : 'center'}
        position="relative"
      >
        {isLargerThan575 && isIssueWithStat && (
          <Box position="absolute" left="0%" top="0%">
            <UndrawStatistics height="100px" />
          </Box>
        )}

        <Flex gridGap="4">
          {isIssueWithStat && (
            <Button
              border="1px solid black"
              w={FIXED_BUTTON_WIDTH}
              rightIcon={
                <FaSave style={{ position: 'relative', top: '1px' }} />
              }
              onClick={() =>
                renderSelfRemovingElement(ImportExportResultsModal)
              }
            >
              Save
            </Button>
          )}
          <Button
            w={FIXED_BUTTON_WIDTH}
            rightIcon={<ImExit style={{ position: 'relative', top: '2px' }} />}
            onClick={dang_APP_SOFT_RESET}
          >
            Exit
          </Button>
        </Flex>
      </Flex>

      <Flex
        h="80%"
        direction="column"
        align="center"
        justify="center"
        gridGap={4}
      >
        {isIssueWithStat ? (
          <>
            <Heading as="h3" fontFamily="handwrite">
              Results:
            </Heading>
            <Box
              borderWidth="2px"
              borderRadius="md"
              boxShadow="xl"
              padding="4"
              maxW="90%"
              maxH="90%"
            >
              <StatisticsTable
                issues={issuesList}
                cards={session.gSettings.cards}
                units={session.gSettings.scoreTypeShort}
                userId={session.clientId}
              />
            </Box>
          </>
        ) : (
          <>
            <Text
              fontFamily="handwrite"
              fontWeight="bold"
              fontSize="xl"
              p="10"
              textAlign="center"
            >
              Unfortunelly your team not voted for any issue.
            </Text>
            <UndrawEmpty width="70%" />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Statistics;
