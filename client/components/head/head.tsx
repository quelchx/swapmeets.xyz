import { HeadProps, HeadState } from "../../@types";

import NextHead from "next/head";

const Head = ({ ...other }: HeadProps) => {
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
