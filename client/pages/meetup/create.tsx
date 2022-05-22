import "react-datepicker/dist/react-datepicker.css";
import type { NextPage } from "next";
import { useAuthState } from "../../context/auth";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Text,
  Box,
  Heading,
  FormControl,
  Divider,
  Input,
  VStack,
  Textarea,
  HStack,
  Button,
} from "@chakra-ui/react";

import Axios from "axios";
import InputSection from "../../components/form/input-section";
import DatePicker from "react-datepicker";
import slugify from "slugify";

type InputRef = React.MutableRefObject<HTMLInputElement>;

const CreateMeetupPage: NextPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const title = useRef() as InputRef;
  const city = useRef() as InputRef;
  const country = useRef() as InputRef;
  const address = useRef() as InputRef;
  const place = useRef() as InputRef;
  const time = useRef() as InputRef;

  const body = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const router = useRouter();
  const { authenticated, user } = useAuthState();

  useEffect(() => {
    return () => {
      if (!authenticated) router.push("/login");
    };
  }, [authenticated, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await Axios.post("/posts", {
      title: title.current.value,
      body: body.current.value,
      author: {
        id: user._id,
        username: user.username,
      },
      slug: slugify(`${user._id}-${title.current.value}-${city.current.value}`),
      meeting: {
        date: startDate,
        time: time.current.value,
        location: {
          city: city.current.value,
          country: country.current.value,
          place: place.current.value,
          address: address.current.value,
        },
      },
    });

    if (res.status !== 200) {
      router.push("/error");
    } else {
      router.push(
        `/meetup/${slugify(
          `${user._id}-${title.current.value}-${city.current.value}`
        )}`
      );
    }
  };

  return (
    <>
      {user && (
        <>
          <Box p={4}>
            <Heading>Create A Meetup</Heading>
            <Text py={2}>Please fill out these fields to create a meetup</Text>
            <Divider my={4} />
            <form onSubmit={handleSubmit}>
              <VStack align={"flex-start"} gap={1}>
                <Heading size="md" mb={2}>
                  Meetup Details
                </Heading>
                <InputSection label="Title">
                  <Input ref={title} isRequired placeholder="JDM Meetup" />
                </InputSection>
                <InputSection label="Body">
                  <Textarea
                    ref={body}
                    isRequired
                    minH="240px"
                    placeholder="Gathering all JDM Fans"
                  />
                </InputSection>
                <Heading size="md" my={2}>
                  Location Details
                </Heading>
                <FormControl>
                  <HStack mb={3} align="center">
                    <InputSection width={"55%"} label="City">
                      <Input ref={city} isRequired placeholder="City" />
                    </InputSection>
                    <InputSection label="Country" width={"45%"}>
                      <Input ref={country} isRequired placeholder="County" />
                    </InputSection>
                  </HStack>
                  <HStack my={2} align="center">
                    <InputSection width="50%" label="Address">
                      <Input
                        ref={address}
                        isRequired
                        placeholder="123 Main Street"
                      />
                    </InputSection>
                    <InputSection width={"50%"} label="Place">
                      <Input ref={place} isRequired placeholder="Tim Hortons" />
                    </InputSection>
                  </HStack>
                  <HStack my={2} align="center">
                    <InputSection width="70%" label="Date">
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                      />
                    </InputSection>
                    <InputSection width="30%" label="Time">
                      <Input ref={time} isRequired placeholder="12:00PM" />
                    </InputSection>
                  </HStack>
                  <Box my={4}>
                    <Button colorScheme={"blue"} type="submit">
                      Submit
                    </Button>
                  </Box>
                </FormControl>
              </VStack>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default CreateMeetupPage;
