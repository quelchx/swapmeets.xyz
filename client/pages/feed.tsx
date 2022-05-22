import { Box, chakra, Divider, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";

import Feed from "../components/feed/feed";
import Page from "../components/page/page";

const FeedPage: NextPage = () => {
  return (
    <>
    <Page title='Feed' description='Latest Swap Meet posts'/>
      <Box p={6}>
        <Heading>Latest Meetups</Heading>
        <chakra.p fontSize={20}>
          Browse The Latest Meetups <br />
          If you want to filter meetups to your area visit{" "}
          <Link href="/explore">here</Link>
        </chakra.p>
      </Box>
      <Divider py={3} />
      <Feed />
    </>
  );
};

export default FeedPage;
