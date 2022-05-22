import { useAuthState } from "../../context/auth";
import { useRouter } from "next/router";
import {
  chakra,
  Box,
  Flex,
  Link,
  useColorModeValue,
  HStack,
  Button,
  Avatar,
} from "@chakra-ui/react";

import NextLink from "next/link";
import ThumbIcon from "../icons/thumb-icon";
import CommentsIcon from "../icons/comments-icon";
import AttendingIcon from "../icons/attending-icon";
import convertDate from "../../helpers/convert-date";
import { attendEventHandler, handleLikePost } from "../../lib/event-handlers";

interface PostProps {
  post: {
    _id?: string;
    title: string;
    body: string;
    author: {
      id: string;
      username: string;
    };
    likes?: [];
    meeting: {
      date: string;
      time: string;
      attending?: [];
      location: {
        city: string;
        country: string;
        place: string;
        address: string;
      };
    };
    comments?: [
      {
        _id: string;
        body: string;
        author: {
          id: string;
          username: string;
        };
        likes?: [];
        createdAt: Date;
      }
    ];
    slug: string;
    createdAt?: Date;
  };
}

const MeetingCard: React.FC<PostProps> = (props) => {
  const router = useRouter();
  const { user } = useAuthState();
  const { location, date, time, attending } = props.post.meeting;

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
            {props.post.title}
          </Box>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {props.post.body}
          </chakra.p>
          <chakra.p fontSize={12} my={1}>
            Posted {convertDate(props.post.createdAt)}
          </chakra.p>
          <HStack mt={2}>
            <small>
              <strong>Event {convertDate(date)}</strong>
            </small>
            <small>@{time}</small>
          </HStack>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <HStack spacing={4}>
            <NextLink href={`/meetup/${props.post.slug}`}>
              <Button as={Button} colorScheme={"blue"}>
                Details
              </Button>
            </NextLink>
            {user ? (
              <HStack spacing={1} gap={1}>
                <ThumbIcon
                  handleClick={() =>
                    handleLikePost(props.post._id, user.username, router)
                  }
                  value={props.post.likes.length}
                />
                <Box
                  onClick={() =>
                    attendEventHandler(props.post._id, user.username, router)
                  }
                >
                  <AttendingIcon attending={attending.length} />
                </Box>
                <CommentsIcon comments={props.post.comments.length} />
              </HStack>
            ) : (
              <NextLink href="/login">
                <chakra.small cursor="pointer" mt={2}>
                  Login To Comment
                </chakra.small>
              </NextLink>
            )}
          </HStack>
          <Flex alignItems="center">
            <Avatar
              mr={2}
              size="sm"
              rounded="full"
              display={{ base: "none", sm: "block" }}
              name={props.post.author.username}
            />
            <NextLink href={`/user/${props.post.author.id}`}>
              <Link
                as="div"
                color={useColorModeValue("gray.700", "gray.200")}
                fontWeight="700"
                cursor="pointer"
              >
                {props.post.author.username}
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MeetingCard;
