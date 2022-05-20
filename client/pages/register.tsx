import type { NextPage } from "next";
import AuthForm from "../components/auth/auth-form";
import Head from "../components/head/head";

const RegisterPage: NextPage = () => {

  return (
    <>
    <Head title='Register your account' description="Register you Swap Meets account for free. It's quick and easy, your information is safe and secure. If you have any questions or concerns, visit the contact page"/>
    <AuthForm type="register" /> 
    </>
  );
};

export default RegisterPage;
