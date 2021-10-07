import {
  Button,
  useToast,
  useClipboard,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react';

interface ILink {
  link: string;
}

const JoinGameLink = (props: ILink) => {
  const { link } = props;

  const toast = useToast();

  const { hasCopied, onCopy } = useClipboard(link);

  const saveToClipboard = (): void => {
    onCopy();

    toast({
      title: 'Successfully copied!',
      status: 'success',
      duration: 1200,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" gridGap={2}>
      <Text>Share link:</Text>

      <Flex maxW="240px" align="center" gridGap={2}>
        <Input boxShadow="lg" value={link} isReadOnly />
        <Button border="1px solid black" onClick={saveToClipboard}>
          {hasCopied ? 'Done!' : 'Copy'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default JoinGameLink;
