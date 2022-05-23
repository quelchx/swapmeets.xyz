import {
  Box,
  Image,
  Flex,
  VStack,
  Heading,
  Input,
  chakra,
  Button,
  Checkbox,
  Divider,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { useAuthState } from "../context/auth";

import Field from "../components/form/field";
import ErrorAlert from "../components/form/error-alert";

import type { InputRef } from "../@types";
import type { NextPage } from "next";
import { credentials, passwordCheck } from "../utils/password-check";
import Link from "next/link";
import ToggleTheme from "../components/toggle/theme";
import Page from "../components/page/page";

const Register: NextPage = () => {
  const router = useRouter();
  const username = useRef() as InputRef;
  const email = useRef() as InputRef;
  const password = useRef() as InputRef;

  const captcha = useRef() as any;

  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState("");

  const { authenticated } = useAuthState();

  const borderColor = useColorModeValue("gray.600", "blue.200");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const verify: any = passwordCheck(password.current.value);
    if (!verify.status) {
      return setError(verify.message);
    }
    try {
      await axios.post("/auth/register", {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        token: await captcha.current.executeAsync(),
      });
      captcha.current.reset();
      router.push("/login");
    } catch (err: any) {
      setError("Please try again");
    }
  };

  if (authenticated) {
    router.push("/feed");
  }

  return (
    <Box display="flex">
      <Page
        title="Register"
        description="Register your Swap Meets account today it is quick and simple"
      />
      <Image
        objectFit={"cover"}
        src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGFydHxlbnwwfHwwfHw%3D&w=1000&q=80"
        minHeight="100vh"
        alt="auth-banner"
        width={{ base: "0%", md: "25%" }}
      />
      <Flex w={"7xl"} pt={12} pb={20} alignItems="center" mx={4}>
        <Box position="fixed" top={6} right={6} zIndex={30} display={"flex"}>
          <ToggleTheme />
        </Box>
        <chakra.form onSubmit={handleLogin} mx={3} pl={{ sm: 8, md: 0 }}>
          <VStack alignItems={"flex-start"} spacing={3}>
            <Box pb={1} gap={2}>
              <Heading>Register an account</Heading>
              <VStack
                py={1.5}
                w={"80%"}
                gap={0.5}
                alignItems={"flex-start"}
                spacing={0}
              >
                <chakra.p>Sign up today, its simple and quick.</chakra.p>
                <chakra.p>
                  We do not track or use any of your information. This website
                  is free to use and open source.
                </chakra.p>
                <chakra.p>
                  For more information on the terms and conditions of Swap Meets
                  please click{" "}
                  <chakra.a
                    fontWeight={"semibold"}
                    _hover={{ color: "blue.500" }}
                    href="./terms-and-conditions.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here{" "}
                  </chakra.a>{" "}
                  to download them.
                </chakra.p>
              </VStack>
              <Divider my={2} w="80%" />
              <chakra.p pt={2}>
                If you already have an account click{" "}
                <chakra.span _hover={{ color: "blue.500" }}>
                  <Link href="/login">here to login</Link>
                </chakra.span>{" "}
                or navigate back to the{" "}
                <chakra.span _hover={{ color: "blue.500" }}>
                  <Link href={"/feed"}>home page</Link>
                </chakra.span>
              </chakra.p>
            </Box>
            <Box mx="auto">
              <chakra.details pt={2} pb={0.5} open={false}>
                <chakra.summary
                  fontSize="sm"
                  fontWeight="semibold"
                  userSelect="none"
                  cursor="pointer"
                  lineHeight={1.5}
                  pb={2}
                >
                  Password Credentials
                </chakra.summary>
                <chakra.div lineHeight={1.25} pl={8}>
                  {credentials.map((credential) => (
                    <li className="px-0.5" key={credential}>
                      {credential}
                    </li>
                  ))}
                </chakra.div>
              </chakra.details>
            </Box>

            <VStack
              alignItems={"flex-start"}
              minW={{ base: "100%", md: "80%" }}
            >
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
                htmlFor="email"
                label="Email"
                helper={true}
                helperText="We will not share your information"
              >
                <Input
                  ref={email}
                  id="email"
                  type="email"
                  placeholder="you@email.com"
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
              <ReCAPTCHA
                size="invisible"
                ref={captcha}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
              />
              <Checkbox
                borderColor={borderColor}
                onChange={() => setAgreement(!agreement)}
              >
                I agree to the terms and conditions
              </Checkbox>
              <Button type="submit" colorScheme={"blue"} disabled={!agreement}>
                Submit
              </Button>
            </VStack>
          </VStack>
        </chakra.form>
      </Flex>
    </Box>
  );
};

export default Register;
