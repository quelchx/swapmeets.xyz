import {
  Box,
  Button,
  chakra,
  Checkbox,
  Divider,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useRef, useState } from "react";

import emailjs from "@emailjs/browser";
import Head from "../components/head/head";

type Reference<E> = React.MutableRefObject<E>;

const ContactPage: NextPage = () => {
  const form = useRef() as Reference<HTMLFormElement>;
  const [isDisabled, setDisabled] = useState(true);

  const handleChange = () => {
    setDisabled(!isDisabled);
  };

  const sendEmail = async (event: any) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_q2ftesl",
        "template_as893qh",
        form.current,
        process.env.NEXT_PUBLIC_EMAIL_JS_KEY
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
    event.target.reset();
  };

  return (
    <>
      <Head
        title="Contact Swap Meets"
        description="Have a question or concern? Maybe you just want to say hello. You can contact Swap Meets here"
      />
      <form ref={form} onSubmit={sendEmail}>
        <Box p={6}>
          <Box my={2}>
            <Heading fontSize={{ base: "30px", md: "40px", lg: "60px" }}>
              Lets Talk
            </Heading>
          </Box>
          <Stack >
            <p>
              If you have a question, concern or simply want to say hello, feel
              free to use this page to get in touch with Swap Meets. We are
              incredibly responsive to your requests and value your questions.
            </p>
            <p>
              We are incredibly responsive to your requests and value your
              questions.
            </p>
          </Stack>
          <Divider my={6} />
          <Flex
            direction={{ base: "column-reverse", xl: "row" }}
            alignContent={"flex-start"}
            gap={2}
            w={"full"}
          >
            <VStack
              alignItems="flex-start"
              pt={{ base: 0, md: 8 }}
              p={2}
              gap={2}
              spacing={1.5}
              w={{ base: "100%", xl: "40%" }}
            >
              <Stack spacing={1}>
                <Heading size={"md"}>Request Features?</Heading>
                <chakra.p>
                  I'm always open to requests for new features. If you have
                  something in mind that could possibly benefit Swap Meets,
                  please feel free to contact me here. If your a developer and
                  want to contribute or make a request, you can visit this link
                  here to submit a request.
                </chakra.p>
              </Stack>
              <Stack spacing={1}>
                <Heading size={"md"}>Have Other Questions?</Heading>
                <chakra.p>
                  If you have other questions or seek support please refer to
                  this link here. If you notice any issues with Swap Meets you
                  can always report an issue using this form or visit this link
                  here.
                </chakra.p>
              </Stack>
              <Stack spacing={1}>
                <Heading size={"md"}>Swap Meets</Heading>
                <HStack spacing={2} gap={1}>
                  <chakra.p>527 Gordon Ave</chakra.p>
                  <chakra.p>London Ontario</chakra.p>
                  <chakra.p>Canada</chakra.p>
                </HStack>
                <Box>
                  <chakra.small>Made by Eric Quelch</chakra.small>
                </Box>
              </Stack>
            </VStack>
            <Box p={2} w={{ base: "100%", xl: "60%" }}>
              <Flex direction={{ base: "column", md: "row" }} w="full" gap={2}>
                <VStack
                  w={{ base: "full", lg: "50%" }}
                  spacing={-0.5}
                  alignItems={"flex-start"}
                >
                  <FormLabel htmlFor="Name">Name</FormLabel>
                  <Input
                    name="name"
                    id="name"
                    required
                    type="text"
                    placeholder="Your Name"
                  />
                </VStack>
                <VStack
                  w={{ base: "full", lg: "50%" }}
                  spacing={-0.5}
                  alignItems={"flex-start"}
                >
                  <FormLabel htmlFor="Email">Email</FormLabel>
                  <Input
                    required
                    name="email"
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                  />
                </VStack>
              </Flex>
              <Box pt={4}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea name="message" id="message" required minH="180px" />
              </Box>
              <HStack
                gap={4}
                justifyContent="space-between"
                alignContent={"flex-start"}
                pt={2}
              >
                <Box>
                  <Checkbox onChange={handleChange}>Im not a robot</Checkbox>
                </Box>
                <Button
                  disabled={isDisabled}
                  type="submit"
                  colorScheme={"blue"}
                >
                  Submit
                </Button>
              </HStack>
            </Box>
          </Flex>
        </Box>
      </form>
    </>
  );
};

export default ContactPage;
