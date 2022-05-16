import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Axios from "axios";
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  HStack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Author, Meeting, Comment, PostModel } from "../../@types";
import { FaCity } from "react-icons/fa";
import {
  BiBuildingHouse,
  BiLocationPlus,
  BiStreetView,
  BiTimeFive,
} from "react-icons/bi";

import ThumbIcon from "../../components/icons/thumb-icon";
import { useAuthState } from "../../context/auth";
import AttendingIcon from "../../components/icons/attending-icon";
import CommentsIcon from "../../components/icons/comments-icon";
import CommentCard from "../../components/cards/comment-card";

export const getStaticPaths = async () => {
  const res = await Axios.get("/posts");
  const data = await res.data;
  const paths = data.map((post: PostModel) => {
    return { params: { id: post.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await Axios.get(`/posts/post/${id}`);
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
};

type Post = {
  data: {
    _id?: string;
    title: string;
    body: string;
    author: Author;
    likes?: [];
    meeting: Meeting;
    comments?: Array<Comment>;
    slug: string;
  };
};

const MeetupPostPage: NextPage<Post> = ({ data }) => {
  const { user, authenticated } = useAuthState();
  return (
    <Flex direction="column" p={6}>
      <Heading pb={3}>{data.title}</Heading>
      <HStack spacing={6}>
        <HStack>
          <FaCity />
          <Box> {data.meeting.location.city}</Box>
        </HStack>
        <HStack>
          <BiLocationPlus />
          <Box>{data.meeting.location.country}</Box>
        </HStack>
        <HStack>
          <BiStreetView />
          <Box>{data.meeting.location.address}</Box>
        </HStack>
        <HStack>
          <BiBuildingHouse />
          <Box>{data.meeting.location.place}</Box>
        </HStack>
        <HStack>
          <BiTimeFive />
          <Box>{data.meeting.time} hours</Box>
        </HStack>
      </HStack>
      <Box mt={5}>
        <Heading pb={3} size={"lg"}>
          Details
        </Heading>
        <chakra.p as={Heading} size={"sm"}>
          {data.body}
        </chakra.p>
      </Box>
      <HStack pt={5}>
        <ThumbIcon
          user={user}
          handleClick={() => {}}
          value={data.likes.length}
        />
        <AttendingIcon attending={data.meeting.attending.length} />
        <CommentsIcon comments={data.comments.length} />
      </HStack>
      <VStack align={"flex-start"} gap={2} mt={4}>
        <Heading size={"md"}>Comments</Heading>
        <CommentCard post={data} />
      </VStack>
      <Divider my={5}/>
      <VStack align="flex-start">
        <Heading size={"lg"}>
          Leave a comment
        </Heading>
        <Textarea placeholder="Write a comment" minHeight="180px" />
        <Button colorScheme={"blue"}>Submit</Button>
      </VStack>
    </Flex>
  );
};

export default MeetupPostPage;