import { Alert, AlertIcon, Text } from '@chakra-ui/react';
import { INotification } from '../../redux/slices/notifications';

export interface IGenericAlertProps extends INotification {
  onClick?: () => void;
}

export const GenericAlert = (props: IGenericAlertProps): JSX.Element => {
  return (
    <Alert status={props.status} onClick={props.onClick} borderRadius="md">
      <AlertIcon />
      <Text>{props.text}</Text>
    </Alert>
  );
};
