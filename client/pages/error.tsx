import type { NextPage } from "next";

import Link from "next/link";
import { chakra, Text, Box, Heading, Button } from "@chakra-ui/react";

const Error: NextPage = () => {
  return (
    <chakra.div display="grid" placeItems="center" height="80vh">
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, red.400, red.600)"
          backgroundClip="text"
        >
          Error
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Something went wrong
        </Text>
        <Text color={"gray.500"} mb={6}>
          To report this error please refer to the contact page and let us know
          what happened
        </Text>

        <Button
          colorScheme="red"
          bgGradient="linear(to-r, red.400, red.500, red.600)"
          color="white"
          variant="solid"
        >
          <Link href="/feed">Go To Home</Link>
        </Button>
      </Box>
    </chakra.div>
  );
};

export default Error;
