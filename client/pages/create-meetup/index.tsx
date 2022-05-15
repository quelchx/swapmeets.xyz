import React from "react";
import type { NextPage } from "next";
import {
  chakra,
  Text,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Divider,
  Stack,
  Input,
  VStack,
  Flex,
  Textarea,
  HStack,
  Button,
} from "@chakra-ui/react";

const CreateMeetupPage: NextPage = () => {
  return (
    <Box p={4}>
      <Heading>Create A Meetup</Heading>
      <Text py={2}>Please fill out these fields to create a meetup</Text>
      <Divider my={4} />
      <VStack gap={1}>
        <FormControl>
          <Heading size="md" mb={2}>
            Meetup Details
          </Heading>
          <FormLabel>Title</FormLabel>
          <Input placeholder="JDM Meetup" />
        </FormControl>
        <FormControl>
          <FormLabel>Body</FormLabel>
          <Textarea minH="240px" placeholder="Gathering all JDM Fans" />
        </FormControl>
        <FormControl>
          <Heading size="md" my={2}>
            Location Details
          </Heading>
          <HStack mb={3} align="center">
            <FormControl minW="60%">
              <FormLabel>City</FormLabel>
              <Input placeholder="City" />
            </FormControl>
            <FormControl minW="40%">
              <FormLabel>Country</FormLabel>
              <Input placeholder="County" />
            </FormControl>
          </HStack>
          <HStack my={2} align="center">
            <FormControl minW="50%">
              <FormLabel>Address</FormLabel>
              <Input placeholder="123 Main Street" />
            </FormControl>
            <FormControl minW="50%">
              <FormLabel>Place</FormLabel>
              <Input placeholder="Tim Hortons" />
            </FormControl>
          </HStack>
          <HStack my={2} align="center">
            <FormControl minW="70%">
              <FormLabel>Date</FormLabel>
              <Input placeholder="123 Main Street" />
            </FormControl>
            <FormControl minW="30%">
              <FormLabel>Time</FormLabel>
              <Input placeholder="Tim Hortons" />
            </FormControl>
          </HStack>
          <Box my={4}>
            <Button>Submit</Button>
          </Box>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default CreateMeetupPage;
