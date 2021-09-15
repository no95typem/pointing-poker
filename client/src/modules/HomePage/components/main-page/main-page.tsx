import {
  Image,
  Heading,
  Text,
  Button,
  Input,
  Flex,
  Box,
} from '@chakra-ui/react';
import pokerPlaning from '../../assets/images/poker-planing.png';
import { UserRole } from '../../../../../../shared/types/user/user-role';
import { USER_ROLES } from '../../../../../../shared/types/user/user-role';
import { useTypedSelector } from '../../../../redux/store';
import { homePageSlice } from '../../../../redux/slices/home-page';

interface MainPageProps {
  onPopupCalled: (forRole: UserRole) => void;
}

const MainPage = ({ onPopupCalled }: MainPageProps): JSX.Element => {
  const lobbyURL = useTypedSelector(state => state.homePage.lobbyURL);
  const { setLobbyURL } = homePageSlice.actions;

  return (
    <Flex align="center" justify="center">
      <Flex width="70%" direction="column" gridGap="2rem" align="center">
        <Image src={pokerPlaning} alt="Poker Planning" fit="scale-down" />

        <Flex gridGap="2rem">
          <Flex direction="column" gridGap="2rem">
            <Flex direction="column" gridGap="2rem">
              <Heading>Start your planning:</Heading>

              <Flex justify="space-between">
                <Text>Create session:</Text>
                <Button
                  colorScheme="facebook"
                  onClick={() => onPopupCalled(USER_ROLES.DEALER)}
                >
                  Start new game
                </Button>
              </Flex>
            </Flex>

            <Flex direction="column" gridGap="2rem">
              <Heading>OR:</Heading>
              <Text>Connect to lobby by URL:</Text>
              <Flex>
                <Input
                  value={lobbyURL}
                  onChange={e => setLobbyURL(e.target.value || '')}
                />
                <Button
                  colorScheme="facebook"
                  onClick={() => onPopupCalled(USER_ROLES.PLAYER)}
                >
                  Connect
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Box bg="grey">SOME TEXT</Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainPage;
