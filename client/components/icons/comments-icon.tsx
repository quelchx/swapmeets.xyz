import { chakra, HStack } from "@chakra-ui/react";
import { MdComment } from "react-icons/md";

interface CommentIconProps {
  comments: number;
}

const CommentsIcon: React.FC<CommentIconProps> = (props) => {
  return (
    <HStack cursor="pointer" spacing={1}>
      <MdComment />
      <chakra.span pt={0.5}>{props.comments}</chakra.span>
    </HStack>
  );
};

export default CommentsIcon;
