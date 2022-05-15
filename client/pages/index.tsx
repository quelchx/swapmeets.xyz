import React from "react";
import type { NextPage } from "next";

import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import Sidebar from "../components/sidebar/sidebar";
import { SearchIcon } from "@chakra-ui/icons";
import Feed from "../components/feed/feed";
import Head from "../components/head/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head title="Home Page" />
      <Sidebar>
        <Box p={6}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input type="text" placeholder="Search For Meetings" />
          </InputGroup>
          <Feed />
        </Box>
      </Sidebar>
    </>
  );
};

export default HomePage;
