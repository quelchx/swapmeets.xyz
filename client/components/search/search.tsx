import { SearchIcon } from "@chakra-ui/icons";
import {
  VStack,
  HStack,
  chakra,
  InputGroup,
  InputLeftElement,
  Input,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Box,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import React, { FormEvent, useRef, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import MeetingCard from "../cards/meeting-card";

const Search = () => {
  const [value, setValue] = React.useState("All");
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const search = useRef() as React.MutableRefObject<HTMLInputElement>;

  const searchPosts = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const param = value;
    if (param === "All") {
      try {
        const { data } = await Axios.get("/posts?limit=20");
        setMeetings(data);
      } catch (err) {
        router.push("/error");
      }
    } else {
      try {
        const { data } = await Axios.get(
          `/posts?meeting.location.${param}=${search.current.value}`
        );
        setMeetings(data);
      } catch (err) {
        router.push("/error");
      }
    }
    // TODO: REMOVE DURING PROD
    setInterval(() => setLoading(false), 500);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <form onSubmit={searchPosts}>
            <VStack alignItems={"flex-start"} p={6}>
              <InputGroup maxW="100%">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  ref={search}
                  w="full"
                  type="text"
                  placeholder="Search For Meetings"
                />
                <Box ml={2}>
                  <Button type="submit">Search</Button>
                </Box>
              </InputGroup>
              <Flex
                direction={{ base: "column", sm: "row" }}
                gap={2}
                justifyContent="center"
              >
                <chakra.p>Search by:</chakra.p>
                <HStack>
                  <RadioGroup onChange={setValue} value={value}>
                    <Stack spacing={3} direction="row">
                      <Radio value="All">All</Radio>
                      <Radio value="city">City</Radio>
                      <Radio value="country">Country</Radio>
                      <Radio value="place">Place</Radio>
                      <Radio value="tag">Tag</Radio>
                    </Stack>
                  </RadioGroup>
                </HStack>
              </Flex>
            </VStack>
          </form>
          <Divider py={1} />
          <Box>
            {meetings.length > 0 && (
              <>
                {meetings.map((meeting) => (
                  <MeetingCard key={meeting._id} post={meeting} />
                ))}
              </>
            )}
          </Box>
        </>
      ) : (
        <Box display="grid" placeItems="center" height="80vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      )}
    </>
  );
};

export default Search;
