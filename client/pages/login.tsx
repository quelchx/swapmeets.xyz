import type { NextPage } from "next";
import AuthForm from "../components/auth/auth-form";
import Head from "../components/head/head";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head
        title="Login to Swap Meets"
        description="Quickly log into your Swap Meets account"
      />
      <AuthForm type="login" />
    </>
  );
};

export default LoginPage;
