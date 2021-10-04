import { Heading, Button, Input, Flex, useMediaQuery } from '@chakra-ui/react';
// import pokerPlaning from '../../assets/images/shared'
import { UserRole } from '../../../../shared/types/user/user-role';
import { USER_ROLES } from '../../../../shared/types/user/user-role';
import { useAppDispatch, useTypedSelector } from '../../redux/store';
import { homePageSlice } from '../../redux/slices/home-page';
import { sessionIdPathParser } from '../../helpers/sessionIdParser';
import { ChangeEvent } from 'react';

import { MAX_BUTTON_WIDTH, MAX_CONTENT_WIDTH } from '../../constants';

// import UndrawWelcome from '../../../../assets/images/undraw/welcome.svg';
import { ReactComponent as UndrawScrumBoard } from '../../assets/images/undraw/scrum-board.svg';
import { ReactComponent as UndrawNewIdeas } from '../../assets/images/undraw/new-ideas.svg';
import { ReactComponent as UndrawLogin } from '../../assets/images/undraw/login.svg';
import { INotification, notifSlice } from '../../redux/slices/notifications';

interface IStartPageContentProps {
  onPopupCalled: (forRole: UserRole) => void;
}

const StartPageContent = ({
  onPopupCalled,
}: IStartPageContentProps): JSX.Element => {
  const lobbyURL = useTypedSelector(state => state.homePage.lobbyURL);
  const dispatch = useAppDispatch();
  const { setLobbyURL } = homePageSlice.actions;

  const [isLargerThan860] = useMediaQuery('(min-width: 860px)');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const path = e.target.value;

    if (path.includes('/session/')) {
      dispatch(setLobbyURL(sessionIdPathParser(path)));
    } else {
      dispatch(setLobbyURL(path || ''));
    }
  };

  return (
    <Flex align="center" justify="center" padding="2" h="100%" w="100%">
      <Flex
        maxW={MAX_CONTENT_WIDTH}
        w="100%"
        direction="row"
        gridGap="2rem"
        align="center"
        justifyContent="center"
        wrap="wrap"
      >
        <Flex
          direction="column"
          gridGap="2rem"
          alignItems="center"
          minW={isLargerThan860 ? undefined : '85%'}
        >
          <Flex
            direction="column"
            gridGap="2rem"
            alignItems="center"
            alignSelf="flex-start"
          >
            <Heading as="h2" size="lg" fontFamily="handwrite">
              Start your planning:
            </Heading>
            <Flex justify="center" align="center" gridGap="1rem">
              {!isLargerThan860 && <UndrawNewIdeas style={{ width: '50%' }} />}
              <Button
                border="1px solid black"
                maxW={MAX_BUTTON_WIDTH}
                onClick={() => onPopupCalled(USER_ROLES.DEALER)}
              >
                {isLargerThan860 ? 'Start new session' : 'Start'}
              </Button>
            </Flex>
          </Flex>

          <Flex direction="column" gridGap="2rem" alignSelf="flex-end">
            <Heading
              size="md"
              as="h4"
              w="100%"
              textAlign="center"
              fontFamily="handwrite"
            >
              OR join to a session:
            </Heading>

            <Flex gridGap="0.5rem" align="center" justify="center">
              <Input
                maxW="280px"
                placeholder="Session ID"
                value={lobbyURL}
                onChange={handleChange}
                // onChange={e => dispatch(setLobbyURL(e.target.value || ''))}
              />
              {isLargerThan860 && (
                <Button
                  border="1px solid black"
                  onClick={() => {
                    if (!lobbyURL) {
                      const notification: INotification = {
                        status: 'error',
                        text: 'Enter session id first!',
                        needToShow: true,
                      };

                      dispatch(notifSlice.actions.addNotifRec(notification));

                      return;
                    }

                    onPopupCalled(USER_ROLES.PLAYER);
                  }}
                >
                  Connect
                </Button>
              )}
            </Flex>

            {!isLargerThan860 && (
              <Flex justify="center" align="center" gridGap="1rem">
                <Button
                  border="1px solid black"
                  onClick={() => onPopupCalled(USER_ROLES.PLAYER)}
                >
                  Connect
                </Button>
                <UndrawLogin style={{ width: '50%' }} />
              </Flex>
            )}
          </Flex>
        </Flex>
        {isLargerThan860 && <UndrawScrumBoard style={{ maxWidth: '50%' }} />}
      </Flex>
    </Flex>
  );
};

export default StartPageContent;
