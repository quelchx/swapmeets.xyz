import { chakra, HStack } from "@chakra-ui/react";
import React from "react";
import { MdComment } from "react-icons/md";

type CommentsIconProps = {
  comments: number;
};

const CommentsIcon = ({ comments }: CommentsIconProps) => {
  return (
    <HStack cursor="pointer" spacing={1}>
      <MdComment />
      <chakra.span pt={0.5}>{comments}</chakra.span>
    </HStack>
  );
};

export default CommentsIcon;
