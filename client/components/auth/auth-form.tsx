import {
  AuthFormType,
  FieldReferenceType,
  InputEventChange,
} from "../../@types";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { credentials, passwordCheck } from "../../utils/password-check";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  chakra,
  CloseButton,
  Flex,
  Heading,
  Link,
  VStack,
  Image,
} from "@chakra-ui/react";

import NextLink from "next/link";
import Axios from "axios";
import Field from "./field";
import ReCAPTCHA from "react-google-recaptcha";

const AuthForm = ({ type }: AuthFormType) => {
  const router = useRouter();
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  if (authenticated) {
    router.push("/");
  }

  const [error, setError] = useState<string>();
  const [agreement, setAgreement] = useState(false);
  const captcha = useRef() as any;
  const email = useRef() as FieldReferenceType;
  const username = useRef() as FieldReferenceType;
  const password = useRef() as FieldReferenceType;

  const authenticateUser = async (event: FormEvent) => {
    event.preventDefault();
    if (type === "register") {
      const verify: any = passwordCheck(password.current.value);
      if (!verify.status) {
        return setError(verify.message);
      }
    }

    try {
      type === "register"
        ? await Axios.post("/auth/register", {
            email: email.current.value,
            username: username.current.value,
            password: password.current.value,
            token: await captcha.current.executeAsync(),
          }).then(() => captcha.current.reset())
        : await Axios.post("/auth/login", {
            username: username.current.value,
            password: password.current.value,
          }).then((res) => {
            dispatch("LOGIN", res.data);
          });

      type === "register" ? router.push("/login") : router.back();
    } catch (err: any) {
      const { error } = err.response.data;
      error?.includes("duplicate key")
        ? setError("Duplicate Email or Username")
        : setError("Something went wrong");
    }
  };

  return (
    <Box display="flex">
      <Image
        objectFit={"cover"}
        src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGFydHxlbnwwfHwwfHw%3D&w=1000&q=80"
        minHeight="100vh"
        width={{ base: "0%", md: "25%" }}
      />
      <Flex alignItems="center" mx={4} mb={20}>
        <VStack mx={3} pl={{ sm: 8, md: 0 }} spacing={3}>
          <Box pb={1} gap={2}>
            <Heading py={0.5} fontSize={{ sm: "2xl", md: "3xl" }}>
              {type === "register" ? (
                <>Register your account</>
              ) : (
                <>Login to your account</>
              )}
            </Heading>
            <Box lineHeight={1.25} my={2}>
              {type === "register" ? (
                <>
                  <chakra.p py={2}>
                    It's quick, easy and free. We do not collect any of your
                    information.
                  </chakra.p>
                  <chakra.small fontWeight="bold">
                    If your already a user, click{" "}
                    <Link href="/login">
                      <chakra.span
                        cursor="pointer"
                        _hover={{
                          textDecoration: "underline",
                          color: "blue.600",
                        }}
                      >
                        here
                      </chakra.span>
                    </Link>{" "}
                    to login.
                  </chakra.small>
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
                      <chakra.div lineHeight={1.25} color="gray.700" pl={8}>
                        {credentials.map((credential) => (
                          <li className="px-0.5" key={credential}>
                            {credential}
                          </li>
                        ))}
                      </chakra.div>
                    </chakra.details>
                  </Box>
                </>
              ) : (
                <>
                  If you don't have an account you can register{" "}
                  <Link href="/register">
                    <chakra.span
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ color: "blue.600" }}
                    >
                      here
                    </chakra.span>
                  </Link>
                </>
              )}
              <Box cursor="pointer" my={0.5}>
                <NextLink href="/feed">
                  <chakra.small
                    _hover={{ color: "blue.500", textDecoration: "underline" }}
                  >
                    Go Back Home
                  </chakra.small>
                </NextLink>
              </Box>
            </Box>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                <Box ml={1}>
                  <CloseButton onClick={() => setError("")} />
                </Box>
              </Alert>
            )}

            <chakra.form
              onSubmit={authenticateUser}
              display="flex"
              flexDirection="column"
              pt={2}
              gap={2}
            >
              <Field
                innerRef={username}
                id="username"
                placeholder="Username"
                type="text"
                required
              >
                <label htmlFor="Username">Username</label>
              </Field>
              {type === "register" && (
                <Field
                  innerRef={email}
                  id="email"
                  placeholder="Email"
                  type="email"
                  required
                >
                  <label htmlFor="Email">Email</label>
                </Field>
              )}
              <Field
                innerRef={password}
                id="password"
                type="password"
                placeholder="Password"
              >
                <label htmlFor="Password">Password</label>
              </Field>
              {type === "register" && (
                <>
                  <chakra.div
                    w={"full"}
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Field
                      checked={agreement}
                      onChange={(e: InputEventChange) =>
                        setAgreement(e.target.checked)
                      }
                      type="checkbox"
                      style={{
                        alignItems: "start",
                      }}
                    />
                    <p>I agree to the terms and conditions</p>
                    <ReCAPTCHA
                      size="invisible"
                      ref={captcha}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                    />
                  </chakra.div>
                  <small>
                    For more information about the terms and conditions please
                    click{" "}
                    <a href="./conditions.md" target="_blank" rel="noreferrer">
                      here
                    </a>
                  </small>
                </>
              )}

              <chakra.div pt={2}>
                <chakra.button
                  type="submit"
                  disabled={type === "register" ? !agreement : false}
                  width="full"
                  _disabled={{ bg: "red.500", opacity: "50%" }}
                  p={2.5}
                  bg="blue.500"
                  color="white"
                >
                  Submit
                </chakra.button>
              </chakra.div>
            </chakra.form>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default AuthForm;
