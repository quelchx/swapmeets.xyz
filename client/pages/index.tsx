import type { NextPage } from "next";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";

import Feed from "../components/feed/feed";
import Head from "../components/head/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head title="Home Page" />
      <VStack p={6}>
        <InputGroup maxW="90%">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input type="text" placeholder="Search For Meetings" />
        </InputGroup>
        <Feed />
      </VStack>
    </>
  );
};

export default HomePage;
