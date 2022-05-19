import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useRef, useState } from "react";

import emailjs from "@emailjs/browser";

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
    <form ref={form} onSubmit={sendEmail}>
      <Box p={6}>
        <Box my={2}>
          <Heading fontSize={{ base: "30px", md: "40px", lg: "60px" }}>
            Contact Swap Meets
          </Heading>
        </Box>
        <Divider my={6} />
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
        <VStack alignItems={"flex-start"} pt={2}>
          {/* this will be changed to a recaptcha */}
          <Box>
            <Checkbox onChange={handleChange}>Im not a robot</Checkbox>
          </Box>
          <Button disabled={isDisabled} type="submit" colorScheme={"blue"}>
            Submit
          </Button>
        </VStack>
      </Box>
    </form>
  );
};

export default ContactPage;
