import { Flex } from '@chakra-ui/react';

import { IMemberData } from '../../../../shared/types/session/member';

import UserCard from '../../components/UserCard/UserCard';
import { QuestionIcon } from '@chakra-ui/icons';

export interface IDealerPlateProps {
  dealerMemberData?: IMemberData;
}

const DealerPlate = (props: IDealerPlateProps): JSX.Element => {
  return (
    <Flex w="100%" maxW="280px" direction="column" gridGap={2}>
      {props.dealerMemberData ? (
        <UserCard {...props.dealerMemberData} isEnoughUsersForKick={false} />
      ) : (
        <QuestionIcon />
      )}
    </Flex>
  );
};

export default DealerPlate;
