import type { NextPage } from "next";
import Error from "../components/error/error";
import Head from "../components/head/head";

const ErrorPage: NextPage = () => {
  return (
    <>
      <Head title="Error" description="Something went wrong" />
      <Error />
    </>
  );
};

export default ErrorPage;
