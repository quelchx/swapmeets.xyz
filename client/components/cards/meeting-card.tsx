import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Axios from "axios";
import {
  chakra,
  Box,
  Image,
  Flex,
  Link,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import {
  MdComment,
  MdEmojiPeople,
  MdOutlineThumbUpOffAlt,
} from "react-icons/md";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { PostModel } from "../../@types";
import { useAuthState } from "../../context/auth";

interface MeetingCardProps {
  post: PostModel;
}

const MeetingCard = ({ post }: MeetingCardProps) => {
  const router = useRouter();
  const { user } = useAuthState();

  const { location, date, time, attending } = post.meeting;

  const handleLikePost: any = async (post: string, user: string) => {
    try {
      const res = await Axios.put(`/posts/${post}/like`, { user: user });
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex w="full" my={2} alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={5}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="95%"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {location.address} in {location.city}
          </chakra.span>
          <Box
            px={1.5}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="xs"
            fontWeight="700"
            rounded="md"
            _hover={{ bg: "gray.500" }}
          >
            @{location.place}
          </Box>
        </Flex>

        <Box mt={2}>
          <Box
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            {post.title}
          </Box>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {post.body}
          </chakra.p>
          <small>
            <strong>{dayjs(date).fromNow()}</strong> @{time}
          </small>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <HStack spacing={4}>
            <NextLink href={post._id}>
              <Link
                color={useColorModeValue("brand.600", "brand.400")}
                _hover={{ textDecor: "underline" }}
              >
                Details
              </Link>
            </NextLink>
            <HStack spacing={1} gap={1}>
              <HStack
                cursor="pointer"
                onClick={() => handleLikePost(post._id, user.username)}
                spacing={1}
              >
                <chakra.span pt={0.5}>{post.likes.length}</chakra.span>
                <MdOutlineThumbUpOffAlt />
              </HStack>
              <HStack spacing={1}>
                <chakra.span pt={0.5}>{attending.length}</chakra.span>
                <MdEmojiPeople />
              </HStack>
              <HStack spacing={1}>
                <chakra.span pt={0.5}>{post.comments.length}</chakra.span>
                <MdComment />
              </HStack>
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {post.author.username}
            </Link>
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: "none", sm: "block" }}
              src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
              alt="avatar"
            />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MeetingCard;
