import React from 'react';
import { Box, Stack, StackDivider } from '@chakra-ui/react';
import RoundStatistics from '../../components/RoundStatistics/RoundStatistics';
import { useTypedSelector } from '../../redux/store';
import { IRoundStatistics } from '../../components/RoundStatistics/RoundStatistics';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import UseSessionData from '../../hooks/useSessionData';

import { MAX_CONTENT_WIDTH } from '../../constants';

const Statistics = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = UseSessionData(session);

  if (!sessionData) return <></>;

  const { sessionNameData } = sessionData;

  const issuesList = session.issues.list;

  return (
    <Box minH="100vh" maxW={MAX_CONTENT_WIDTH} w="100%" m="0 auto" p="5px">
      <EditableHeader {...sessionNameData} />

      <Stack
        mt="20px"
        spacing={1}
        justify="center"
        divider={<StackDivider borderColor="gray.400" />}
      >
        {issuesList.map(issue => {
          if (issue.stat) {
            const issueData: IRoundStatistics = {
              issueTitle: issue.title,
              votes: issue.stat.votes,
            };

            return <RoundStatistics {...issueData} key={issue.title} />;
          }

          return null;
        })}
      </Stack>
    </Box>
  );
};

export default Statistics;
