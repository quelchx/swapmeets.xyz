import { chakra, HStack } from "@chakra-ui/react";
import { MdComment } from "react-icons/md";

const CommentsIcon = ({ comments }: { comments: number }) => {
  return (
    <HStack cursor="pointer" spacing={1}>
      <MdComment />
      <chakra.span pt={0.5}>{comments}</chakra.span>
    </HStack>
  );
};

export default CommentsIcon;
