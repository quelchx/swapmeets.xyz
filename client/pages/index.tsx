import React from "react";
import type { NextPage } from "next";

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";

import Sidebar from "../components/sidebar/sidebar";
import { SearchIcon } from "@chakra-ui/icons";
import Feed from "../components/feed/feed";
import Head from "../components/head/head";
import Navbar from "../components/navbar/navbar";

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
