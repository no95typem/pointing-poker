import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import RoundStatistics from '../../components/RoundStatistics/RoundStatistics';
import { useTypedSelector } from '../../redux/store';
import { IRoundStatistics } from '../../components/RoundStatistics/RoundStatistics';

const Statistics = (): JSX.Element => {
  const issuesList = useTypedSelector(state => state.session.issues.list);

  return (
    <Box minH="100vh" maxW="1440px" w="90%" m="0 auto" p="5px">
      <Stack>
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
