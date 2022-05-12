import React from "react";
import type { NextPage } from "next";

import { Box } from "@chakra-ui/react";
import AuthForm from "../components/forms/auth-form";

const RegisterPage: NextPage = () => {
  return (
    <div>
      <AuthForm type="register" />
    </div>
  );
};

export default RegisterPage;
