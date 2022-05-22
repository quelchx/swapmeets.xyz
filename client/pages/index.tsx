import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "../context/auth";
import NextLink from "next/link";
import Page from "../components/page/page";

const HomePage: NextPage = () => {
  const { authenticated } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (authenticated) {
        router.push("/feed");
      }
    };
  }, [authenticated, router]);

  return (
    <>
      <Page />
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: -0.5,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Swap Meets
              </Text>
              <br />{" "}
              <Heading size={"xl"} color={"blue.400"} as={"span"}>
                Meetup, Plan & Trade
              </Heading>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              Check out Swap Meets in your area. It is easy, simple and
              absolutely free
            </Text>
            <Stack pt={2} direction={{ base: "column", md: "row" }} spacing={2}>
              <NextLink href="/feed">
                <Button
                  colorScheme={"blue"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Browse Meets
                </Button>
              </NextLink>
              <NextLink href="/about">
                <Button>How It Works</Button>
              </NextLink>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vbCUyMGFydHxlbnwwfHwwfHw%3D&w=1000&q=80"
          />
        </Flex>
      </Stack>
    </>
  );
};

export default HomePage;
