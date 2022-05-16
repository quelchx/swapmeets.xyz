import React from "react";
import type { NextPage } from "next";
import AuthForm from "../components/auth/auth-form";

const RegisterPage: NextPage = () => {

  return (
    <div>
      <AuthForm type="register" />
    </div>
  );
};

export default RegisterPage;
