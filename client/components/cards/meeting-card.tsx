import { useEffect } from "react";
import { useAuthState } from "../../context/auth";
import { useRouter } from "next/router";
import { PostProps } from "../../@types";
import {
  chakra,
  Box,
  Image,
  Flex,
  Link,
  useColorModeValue,
  HStack,
  Button,
} from "@chakra-ui/react";

import NextLink from "next/link";
import Axios from "axios";
import ThumbIcon from "../icons/thumb-icon";
import CommentsIcon from "../icons/comments-icon";
import AttendingIcon from "../icons/attending-icon";
import convertDate from "../../helpers/convert-date";

const MeetingCard = ({ post }: PostProps) => {
  const router = useRouter();
  const { user } = useAuthState();

  const { location, date, time, attending } = post.meeting;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  const handleLikePost: any = async (post: string, user: string) => {
    try {
      await Axios.put(`/posts/${post}/like`, { user: user });
    } catch (error) {
      router.push("/error");
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
        minW="100%"
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
            <strong>{convertDate(date)}</strong> @{time}
          </small>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <HStack spacing={4}>
            <NextLink href={`/meetup/${post.slug}`}>
              <Button as={Button} colorScheme={"blue"}>
                Details
              </Button>
            </NextLink>
            <HStack spacing={1} gap={1}>
              <ThumbIcon
                user={user}
                handleClick={() => handleLikePost(post._id, user.username)}
                value={post.likes.length}
              />
              <AttendingIcon attending={attending.length} />
              <CommentsIcon comments={post.comments.length} />
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
