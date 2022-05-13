import React from "react";
import type { NextPage } from "next";

import { Box } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/sidebar";

const HomePage: NextPage = () => {
  return (
    <div>
      <Sidebar>
        <Box p={6}>Content Goes Here</Box>
      </Sidebar>
    </div>
  );
};

export default HomePage;
