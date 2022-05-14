import React from "react";
import type { NextPage } from "next";

import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import Sidebar from "../components/sidebar/sidebar";
import { SearchIcon } from "@chakra-ui/icons";
import MeetingCard from "../components/cards/meeting-card";
import Feed from "../components/feed/feed";

const HomePage: NextPage = () => {
  return (
    <div>
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
    </div>
  );
};

export default HomePage;
