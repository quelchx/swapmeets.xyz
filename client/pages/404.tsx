import type { NextPage } from "next";

import Link from "next/link";
import { Box, Heading, Text, Button, chakra } from "@chakra-ui/react";

const PageNotFound: NextPage = () => {
  return (
    <>
      <chakra.div display="grid" placeItems="center" height="80vh">
        <Box textAlign="center" py={10} px={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-l, blue.400, blue.600)"
            backgroundClip="text"
          >
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Page Not Found
          </Text>
          <Text color={"gray.500"} mb={6}>
            Looks like this page does not exist
          </Text>

          <Button
            colorScheme="blue"
            bgGradient="linear(to-l, blue.400, blue.500, blue.600)"
            color="white"
            variant="solid"
          >
            <Link href="/">Go To Home</Link>
          </Button>
        </Box>
      </chakra.div>
    </>
  );
};

export default PageNotFound;
