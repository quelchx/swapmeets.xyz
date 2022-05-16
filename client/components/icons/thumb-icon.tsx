import { chakra, HStack } from "@chakra-ui/react";
import React from "react";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import { UserModel } from "../../@types";

type ThumbIconProps = {
  user: UserModel;
  value: number;
  handleClick: () => any;
};

const ThumbIcon = ({ user, value, handleClick }: ThumbIconProps) => {
  return (
    <HStack
      display={user ? "flex" : "none"}
      cursor="pointer"
      onClick={handleClick}
      spacing={1}
    >
      <MdOutlineThumbUpOffAlt  />
      <chakra.span pt={0.5}>{value}</chakra.span>
    </HStack>
  );
};

export default ThumbIcon;
