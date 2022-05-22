import type { PostModel } from "../../@types";
import type {
  GetServerSideProps,
  NextPage,
} from "next";
import React, { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  HStack,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import {
  BiBuildingHouse,
  BiLocationPlus,
  BiStreetView,
  BiTimeFive,
} from "react-icons/bi";

import { FaCity } from "react-icons/fa";
import { useAuthState } from "../../context/auth";

import Axios from "axios";
import ThumbIcon from "../../components/icons/thumb-icon";
import AttendingIcon from "../../components/icons/attending-icon";
import CommentsIcon from "../../components/icons/comments-icon";
import CommentCard from "../../components/cards/comment-card";
import NextLink from "next/link";
import { attendEventHandler, handleLikePost } from "../../lib/event-handlers";

type IconComponent = {
  icon: JSX.Element;
  text: string;
};

interface DataProps {
  data: PostModel;
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const id = context.params.id;
  const { data } = await Axios.get(`/posts/post/${id}`);

  return {
    props: {
      data,
    },
  };
};

export const MeetingHeadlineItem = ({ icon, text }: IconComponent) => {
  const Icon = () => icon;
  return (
    <HStack>
      <Icon />
      <Text fontSize={13}>{text}</Text>
    </HStack>
  );
};

const MeetupPostPage: NextPage<DataProps> = (props) => {
  const message = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const { user } = useAuthState();

  const router = useRouter();

  const commentOnPost = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await Axios.put(`/posts/${props.data._id}/comment`, {
        body: message.current.value,
        author: {
          id: user._id,
          username: user.username,
        },
      });
      router.reload();
    } catch (err) {
      router.push("/error");
    }
  };

  return (
    <>
      <Flex w="100%" direction="column" p={6}>
        <Heading pb={3}>{props.data.title}</Heading>
        <Flex
          gap={{ base: 1, md: 4 }}
          direction={{ base: "column", md: "row" }}
          minW="100%"
        >
          <MeetingHeadlineItem
            icon={<FaCity />}
            text={props.data.meeting.location.city}
          />
          <MeetingHeadlineItem
            icon={<BiLocationPlus />}
            text={props.data.meeting.location.country}
          />
          <MeetingHeadlineItem
            icon={<BiStreetView />}
            text={props.data.meeting.location.address}
          />
          <MeetingHeadlineItem
            icon={<BiBuildingHouse />}
            text={props.data.meeting.location.place}
          />
          <MeetingHeadlineItem
            icon={<BiTimeFive />}
            text={props.data.meeting.time}
          />
        </Flex>
        <Box mt={5}>
          <Heading pb={3} size={"lg"}>
            Details
          </Heading>
          <chakra.p as={Heading} size={"sm"}>
            {props.data.body}
          </chakra.p>
        </Box>
        {user ? (
          <HStack pt={5}>
            <ThumbIcon
              handleClick={() =>
                handleLikePost(props.data._id, user.username, router)
              }
              value={props.data.likes.length}
            />
            <Box
              onClick={() =>
                attendEventHandler(props.data._id, user.username, router)
              }
            >
              <AttendingIcon attending={props.data.meeting.attending.length} />
            </Box>
            <CommentsIcon comments={props.data.comments.length} />
          </HStack>
        ) : (
          <NextLink href="/login">
            <chakra.small cursor="pointer" mt={2}>
              Login to comment or attend meeting
            </chakra.small>
          </NextLink>
        )}
        <VStack align={"flex-start"} gap={2} mt={4}>
          <Heading size={"md"}>Comments</Heading>
          {props.data.comments.map((comment: any) => (
            <Box w="100%" key={comment._id}>
              <CommentCard
                post={props.data}
                user={user}
                id={props.data._id}
                comment={comment}
              />
            </Box>
          ))}
        </VStack>
        <Divider my={5} />
        {user ? (
          <VStack align="flex-start">
            <Heading size={"lg"}>Leave a comment</Heading>
            <Box pt={2} width={"100%"}>
              <form onSubmit={commentOnPost}>
                <Textarea
                  ref={message}
                  placeholder="Write a comment"
                  minHeight="180px"
                />
                <Box mt={3}>
                  <Button
                    type="submit"
                    w={{ base: "full", sm: "90px" }}
                    colorScheme={"blue"}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </VStack>
        ) : (
          <Box _hover={{ color: "blue.500" }} cursor={"pointer"}>
            <NextLink href="/login">Login to leave a comment</NextLink>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default MeetupPostPage;
