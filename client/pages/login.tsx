import React from "react";
import type { NextPage } from "next";
import AuthForm from "../components/forms/auth-form";

const LoginPage: NextPage = () => {
 
  return (
    <div>
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;
