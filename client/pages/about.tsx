import {
  Flex,
  Image,
  Box,
  chakra,
  Stack,
  Divider,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";

import NextLink from "next/link";

const AboutPage: NextPage = () => {
  return (
    <>
      <Box pos="relative" overflow="hidden">
        <Box maxW="7xl" mx="auto">
          <Box pos="relative" pb={4} w="full" border="solid 1px transparent">
            <Box
              maxW={{ base: "7xl" }}
              px={{ base: 4, sm: 6, lg: 8 }}
              mt={{ base: 12, md: 16, lg: 20, xl: 28 }}
            >
              <Box
                textAlign="center"
                w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
                mx="auto"
              >
                <chakra.h1
                  fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                  letterSpacing="tight"
                  lineHeight="short"
                  fontWeight="extrabold"
                >
                  <chakra.span display={{ base: "block", xl: "inline" }}>
                    Swap{" "}
                  </chakra.span>
                  <chakra.span display={{ base: "block", xl: "inline" }}>
                    Meets
                  </chakra.span>
                </chakra.h1>
                <chakra.p
                  mt={{ base: 3, sm: 5, md: 5 }}
                  mx={{ sm: "auto", lg: 0 }}
                  mb={6}
                  fontSize={{ base: "lg", md: "xl" }}
                  color="gray.500"
                  lineHeight="base"
                >
                  Dont have an account and want to post a Swap Meet?
                </chakra.p>
                <Stack
                  direction={{ base: "column", sm: "column", md: "row" }}
                  mb={{ base: 4, md: 8 }}
                  spacing={{ base: 4, md: 2 }}
                  justifyContent="center"
                >
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    mb={{ base: 4, md: 8 }}
                    spacing={2}
                  >
                    <Box>
                      <NextLink href="/register">
                        <Button
                          colorScheme="blue"
                          fontWeight="bold"
                          rounded="md"
                        >
                          Sign up for free
                        </Button>
                      </NextLink>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Flex direction={{ base: "column", md: "row" }} px={8} pt={12} mx="auto">
        <Box
          w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
          mx="auto"
          pr={{ md: 20 }}
        >
          <chakra.h2
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="extrabold"
            lineHeight="shorter"
            mb={6}
          >
            <chakra.span display="block">What is Swap Meets?</chakra.span>
          </chakra.h2>
          <chakra.p mb={6} fontSize={{ base: "lg", md: "xl" }}>
            Want to gather a bunch of friends and swap and sell some things you
            got kicking around, this is the place.
          </chakra.p>
        </Box>
        <Box w={{ base: "full", md: 10 / 12 }} mx="auto" textAlign="center">
          {/* TODO: CHANGE IMAGE */}
          <Image
            w="full"
            rounded="lg"
            shadow="2xl"
            src="./images/showcase.png"
            alt="About"
          />
        </Box>
      </Flex>
      <Divider py={4} />
      <VStack px={{ base: 10, sm: 12, lg: 24 }} spacing={4} py={12}>
        <Heading size={"2xl"}>What can I do on Swap Meets?</Heading>
        <Text fontSize={26}>
          Swap Meets is a website that allows users to post or browse meetups in
          their areas. Quickly create a meetup to trade or sell your car parts,
          fishing gear, pokemon cards -- whatever you like. If you have and
          interest in it post it.
        </Text>
        <Text fontSize={26}>
          This website was made by one person for people like myself, who have
          interests and want to meet up with people, talk about our shared
          interests and swap and sell things I have laying around.
        </Text>
        <Text fontSize={26}>
          Swap Meets is evolving and it would not be what it is without you. Help
          Swap Meets grow by using this application. It&apos;s free and open source,
          maintained by one person for the people. Over time this website will
          improve as the user basis grow! Help me out by using this website.
          Thank you in advance everyone.
        </Text>
      </VStack>
    </>
  );
};

export default AboutPage;
