import React from "react";
import Head from "next/head";
// import { useRouter } from "next/router";

interface MetaState {
  title: string;
  description: string;
  image: string;
  type: string;
}

const Page = ({ ...overrides }) => {
  // const router = useRouter();

  const meta: MetaState = {
    title: "Swap Meet",
    description:
      "Swap Meets -- Come arrange meetups to trade or sell your car parts, sports gear, pokemon cards, whatever you fancy. Post and browse meetups in your area on Swap Meets",
    image: "./images/index.jpg",
    type: "website",
    ...overrides,
  };

  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="keywords" content={meta.description} />
      <meta name="description" content={meta.description} />
      <meta content={meta.description} name="description" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      {/* <meta property="og:url" content={`https://quelchx${router.asPath}`} /> */}
      {/* <link rel="canonical" href={`https://quelchx.com${router.asPath}`} /> */}
      <meta property="og:type" content={meta.type} />
      {/* <meta property="og:site_name" content="quelchx.com" /> */}
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="@wcbblez" /> */}
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
  );
};

export default Page;
