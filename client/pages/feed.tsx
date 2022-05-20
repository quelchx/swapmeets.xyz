import type { NextPage } from "next";

import Feed from "../components/feed/feed";
import Head from "../components/head/head";

const FeedPage: NextPage = () => {
  return (
    <>
      <Head title="All Meetups" description="Browse the latest meetups" />
      <Feed />
    </>
  );
};

export default FeedPage;
