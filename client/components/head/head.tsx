import React, { ReactNode } from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";

type HeadState = {
  title: string;
  description: string;
  image: string;
  type: "website";
};

type HeadProps = {
  [data: string]: any;
};

const Head = ({ ...other }: HeadProps) => {
  const router = useRouter();
  const initalState: HeadState = {
    title: "Meetups",
    description: "",
    type: "website",
    image: "",
    ...other,
  };

  return (
    <>
      <NextHead>
        <title>{initalState.title}</title>
        <meta name="description" content={initalState.description} />
      </NextHead>
    </>
  );
};

export default Head;
