import type { NextPage } from "next";
import { Box, Heading, Text, Button, chakra } from "@chakra-ui/react";

import NextLink from "next/link";
import Head from "../components/head/head";

const PageNotFound: NextPage = () => {
  return (
    <>
      <Head title="Page Not Found" description="Couldn't find page" />

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
            Looks like this page doesn't exist
          </Text>

          <Button
            colorScheme="blue"
            bgGradient="linear(to-l, blue.400, blue.500, blue.600)"
            color="white"
            variant="solid"
          >
            <NextLink href="/">Go To Home</NextLink>
          </Button>
        </Box>
      </chakra.div>
    </>
  );
};

export default PageNotFound;
