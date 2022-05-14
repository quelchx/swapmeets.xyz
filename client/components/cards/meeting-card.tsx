import React from "react";

import {
  chakra,
  Box,
  Image,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { PostModel } from "../../@types";

interface MeetingCardProps {
  post: PostModel;
}

const MeetingCard = ({ post }: MeetingCardProps) => {
  const { _id, title, body, author } = post;
  const { city, place, country } = post.meeting.location;
  return (
    <Flex w="full" my={2} alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        py={4}
        width='full'
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {city}, {country} 
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
            @{place}
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
            {title}
          </Box>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {body}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
          >
            Details
          </Link>

          <Flex alignItems="center">
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
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {author}
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MeetingCard;
