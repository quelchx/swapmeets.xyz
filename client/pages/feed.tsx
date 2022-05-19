import type { NextPage } from "next";
import { SearchIcon } from "@chakra-ui/icons";
import {
  chakra,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";

import Feed from "../components/feed/feed";
import Head from "../components/head/head";

const FeedPage: NextPage = () => {
  return (
    <>
      <Head title="Home Page" />
      <Feed />
    </>
  );
};

export default FeedPage;
