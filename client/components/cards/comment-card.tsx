import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Link,
  HStack,
} from "@chakra-ui/react";

import Axios from "axios";
import convertDate from "../../helpers/convert-date";
import ThumbIcon from "../icons/thumb-icon";
import ConfigureCommentButton from "../buttons/configure-comment";

/** will assign better typing in the future */
const CommentCard = ({ comment, user, id }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  const likeComment = async () => {
    try {
      await Axios.put(`/posts/${id}/like-comment`, {
        user: user.username,
        comment: comment._id,
      });
    } catch (err) {
      router.push("/error");
    }
  };

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
            Posted {convertDate(comment.created)}
          </chakra.span>
          {user && (
            <>
              {user._id === comment.author.id && (
                <HStack>
                  <ConfigureCommentButton label="Edit" color="blue.600" />
                  <ConfigureCommentButton label="Delete" color="red.600" />
                </HStack>
              )}
            </>
          )}
        </Flex>

        <Box mt={2}>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {comment.body}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          <Link
            color={useColorModeValue("gray.700", "gray.200")}
            fontWeight="700"
            cursor="pointer"
          >
            @{comment.author.username}
          </Link>
          <Flex alignItems="center">
            <HStack spacing={1} gap={1}>
              <ThumbIcon
                user={user}
                handleClick={likeComment}
                value={comment.likes.length}
              />
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CommentCard;
