import {
  Box,
  Image,
  Flex,
  VStack,
  Heading,
  Input,
  chakra,
  Button,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

import axios from "axios";

import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { useAuthDispatch, useAuthState } from "../context/auth";

import Field from "../components/form/field";
import ErrorAlert from "../components/form/error-alert";

import type { InputRef } from "../@types";
import type { NextPage } from "next";
import Link from "next/link";
import ToggleTheme from "../components/toggle/theme";
import Page from "../components/page/page";

const Login: NextPage = () => {
  const router = useRouter();
  const username = useRef() as InputRef;
  const password = useRef() as InputRef;

  const [error, setError] = useState("");

  const dispatch = useAuthDispatch();
  const borderColor = useColorModeValue("gray.600", "blue.200");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", {
        username: username.current.value,
        password: password.current.value,
      });
      dispatch("LOGIN", data);
      router.push("/feed");
    } catch (err: any) {
      setError("Please try again");
    }
  };

  const { authenticated } = useAuthState();

  if (authenticated) router.push("/feed");

  return (
    <>
      <Page title="Login" description="Login to your Swap Meets account" />

      <Box display="flex">
        <Image
          objectFit={"cover"}
          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGFydHxlbnwwfHwwfHw%3D&w=1000&q=80"
          minHeight="100vh"
          alt="auth-banner"
          width={{ base: "0%", md: "25%" }}
        />
        <Flex alignItems="center" mx={4} mb={20}>
          <Box position="fixed" top={6} right={6} zIndex={30} display={"flex"}>
            <ToggleTheme />
          </Box>
          <chakra.form onSubmit={handleLogin} mx={3} pl={{ sm: 8, md: 0 }}>
            <VStack w={"80%"} alignItems={"flex-start"} spacing={3}>
              <Box pb={1} gap={2}>
                <Heading>Login to your account</Heading>
                <chakra.p py={2} w={"80%"}>
                  Sign in to get started. If your have forgot your username or
                  password please{" "}
                  <chakra.span fontWeight="bold" _hover={{ color: "blue.500" }}>
                    <Link href="/contact">click here</Link>
                  </chakra.span>{" "}
                  to contact us to reset your password or username
                </chakra.p>
                <Divider my={2} />
                <chakra.p pt={2}>
                  If you do not have an account click{" "}
                  <chakra.span
                    fontWeight={"semibold"}
                    _hover={{ color: "blue.500" }}
                  >
                    <Link href="/register">here to register</Link>
                  </chakra.span>{" "}
                  now or navigate back to the{" "}
                  <chakra.span
                    fontWeight={"semibold"}
                    _hover={{ color: "blue.500" }}
                  >
                    <Link href="/feed">home page</Link>
                  </chakra.span>
                </chakra.p>
              </Box>
              {error && (
                <ErrorAlert handleClose={() => setError("")} error={error} />
              )}
              <Field htmlFor="username" label="Username">
                <Input
                  ref={username}
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  borderColor={borderColor}
                />
              </Field>
              <Field
                htmlFor="password"
                label="Password"
                helper={true}
                helperText="Please do not share your password"
              >
                <Input
                  ref={password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  borderColor={borderColor}
                />
              </Field>
              <Button type="submit" colorScheme={"blue"}>
                Submit
              </Button>
            </VStack>
          </chakra.form>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
