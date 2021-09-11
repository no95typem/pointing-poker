import React, { MouseEvent } from 'react';
import {
  Image,
  Heading,
  Text,
  Button,
  Input,
  Flex,
  Box,
} from '@chakra-ui/react';
// import * as UI from "@chakra-ui/react";
import pokerPlaning from '../../assets/images/poker-planing.png';

interface Props {
  open: (name: string) => void;
}

const Page = ({ open }: Props): JSX.Element => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    open(name);
  };

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
                  name="dealer"
                  onClick={handleClick}
                >
                  Start new game
                </Button>
              </Flex>
            </Flex>

            <Flex direction="column" gridGap="2rem">
              <Heading>OR:</Heading>
              <Text>Connect to lobby by URL:</Text>
              <Flex>
                <Input />
                <Button colorScheme="facebook" onClick={handleClick}>
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

export default Page;
