import { IconButton } from '@chakra-ui/button';
import { CheckIcon, CloseIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/layout';
import { Member } from '../../../../shared/types/session/member';
import { GenericAlert } from '../../components/GenericAlert/GenericAlert';
import UserCard from '../../components/UserCard/UserCard';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import { INotification } from '../../redux/slices/notifications';

export interface INotificationProps {
  n: INotification;
  onDismiss: () => void;
}

export const Notification = (props: INotificationProps): JSX.Element => {
  const { n, onDismiss } = props;
  switch (n.specialType) {
    case 'new-connection':
      const newMemeber = n.addData as Member;

      return (
        <Flex direction="column" gridGap={1} w="100%">
          <Text>Allow new member to connect?</Text>
          <Flex gridGap={1} w="100%" justify="space-between">
            <UserCard
              member={newMemeber}
              isItYou={false}
              isRoundStarted={true}
              size="sm"
              isEnoughUsersForKick={false}
            />
            <Flex gridGap={1}>
              <IconButton
                aria-label="allow connection"
                icon={<CheckIcon />}
                onClick={() => {
                  SERVER_ADAPTER.respondToNewConnection(
                    newMemeber.userSessionPublicId,
                    true,
                  );
                  onDismiss();
                }}
              />
              <IconButton
                aria-label="reject connection"
                icon={<NotAllowedIcon />}
                onClick={() => {
                  SERVER_ADAPTER.respondToNewConnection(
                    newMemeber.userSessionPublicId,
                    false,
                  );
                  onDismiss();
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      );
    default:
      return (
        <>
          <GenericAlert {...n} />
          <IconButton
            aria-label="dismiss"
            icon={<CloseIcon />}
            onClick={onDismiss}
          />
        </>
      );
  }
};
