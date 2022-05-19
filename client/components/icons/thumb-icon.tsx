import { chakra, HStack } from "@chakra-ui/react";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";

type ThumbIconProps = {
  value: number;
  handleClick: () => any;
};

const ThumbIcon = ({ value, handleClick }: ThumbIconProps) => {
  return (
    <HStack cursor="pointer" onClick={handleClick} spacing={1}>
      <MdOutlineThumbUpOffAlt />
      <chakra.span pt={0.5}>{value}</chakra.span>
    </HStack>
  );
};

export default ThumbIcon;
