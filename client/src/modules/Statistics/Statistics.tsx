import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import RoundStatistics from '../../components/RoundStatistics/RoundStatistics';
import { useTypedSelector } from '../../redux/store';
import { IRoundStatistics } from '../../components/RoundStatistics/RoundStatistics';
import EditableHeader from '../../containers/EdidableHeader/EditableHeader';
import UseSessionData from '../../hooks/useSessionData';

const Statistics = (): JSX.Element => {
  const session = useTypedSelector(state => state.session);

  const sessionData = UseSessionData(session);

  if (!sessionData) return <></>;

  const { sessionNameData } = sessionData;

  const issuesList = session.issues.list;

  return (
    <Box minH="100vh" maxW="1440px" w="90%" m="0 auto" p="5px">
      <EditableHeader {...sessionNameData} />

      <Stack mt="20px">
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
