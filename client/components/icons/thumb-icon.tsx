import { ThumbIconProps } from "../../@types";
import { chakra, HStack } from "@chakra-ui/react";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";

const ThumbIcon = ({ user, value, handleClick }: ThumbIconProps) => {
  return (
    <HStack
      display={user ? "flex" : "none"}
      cursor="pointer"
      onClick={handleClick}
      spacing={1}
    >
      <MdOutlineThumbUpOffAlt />
      <chakra.span pt={0.5}>{value}</chakra.span>
    </HStack>
  );
};

export default ThumbIcon;
