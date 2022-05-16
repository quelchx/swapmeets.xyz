import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  HStack,
} from "@chakra-ui/react";
import ThumbIcon from "../icons/thumb-icon";
import { useAuthState } from "../../context/auth";
import { PostProps } from "./meeting-card";

import Axios from "axios";

const CommentCard = ({ post }: PostProps) => {
  const handleLikeComment: any = async (post: string, user: string) => {
    console.log("");
  };

  const { user } = useAuthState();
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        minW="100%"
        py={4}
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
            Mar 10, 2019
          </chakra.span>
          <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{ bg: "gray.500" }}
          >
            #city
          </Link>
        </Flex>

        <Box mt={2}>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
            enim reprehenderit nisi, accusamus delectus nihil quis facere in
            modi ratione libero!
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          <HStack spacing={1} gap={1}>
            <ThumbIcon user={user} handleClick={() => {}} value={0} />
          </HStack>

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
              Khatab wedaa
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CommentCard;
