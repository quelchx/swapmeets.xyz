import { useRouter } from "next/router";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Link,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Axios from "axios";
import convertDate from "../../helpers/convert-date";
import ThumbIcon from "../icons/thumb-icon";
import ConfigureCommentButton from "../buttons/configure-comment";
import { Author, UserModel } from "../../@types";
import EditCommentModal from "../modal/edit-comment-modal";

/** will assign better typing in the future */
type CommentCardProps = {
  comment: {
    _id: string;
    body: string;
    author: Author;
    likes?: [];
    createdAt?: Date;
  };
  user: UserModel;
  id: string;
  post: any;
};

const CommentCard = ({ post, comment, user, id }: CommentCardProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const likeComment = async () => {
    try {
      await Axios.put(`/posts/${id}/like-comment`, {
        user: user.username,
        comment: comment._id,
      });
      router.reload();
    } catch (err) {
      router.push("/error");
    }
  };

  const deleteComment = async () => {
    try {
      await Axios.delete(`/posts/comment/delete/${id}?comment=${comment._id}`);
      router.reload();
    } catch (err) {
      router.push("/error");
    }
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <EditCommentModal
        comment={comment}
        post={post}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
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
            Written {convertDate(comment.createdAt)}
          </chakra.span>
          {user && (
            <>
              {user._id === comment.author.id && (
                <HStack>
                  <Box onClick={onOpen}>
                    <ConfigureCommentButton label="Edit" color="blue.600" />
                  </Box>
                  <Box onClick={deleteComment}>
                    <ConfigureCommentButton label="Delete" color="red.600" />
                  </Box>
                </HStack>
              )}
            </>
          )}
        </Flex>

        <Box my={2}>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {comment.body}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          <HStack spacing={0.5}>
            <chakra.p>Posted by: </chakra.p>
            <NextLink href={`/user/${comment.author.id}`}>
              <Link
                as="div"
                color={useColorModeValue("gray.700", "gray.200")}
                fontWeight="700"
                cursor="pointer"
              >
                @{comment.author.username}
              </Link>
            </NextLink>
          </HStack>
          <Flex alignItems="center">
            {user ? (
              <HStack spacing={1} gap={1}>
                <ThumbIcon
                  handleClick={likeComment}
                  value={comment.likes.length}
                />
              </HStack>
            ) : (
              <Box _hover={{ color: "blue.600" }} as="small" cursor="pointer">
                <NextLink href="/login">Login to like comment</NextLink>
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CommentCard;
