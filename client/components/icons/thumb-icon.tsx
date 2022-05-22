import { chakra, HStack } from "@chakra-ui/react";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";

type ThumbIconProps = {
  value: number;
  handleClick: () => any;
};

const ThumbIcon: React.FC<ThumbIconProps> = (props) => {
  return (
    <HStack cursor="pointer" onClick={props.handleClick} spacing={1}>
      <MdOutlineThumbUpOffAlt />
      <chakra.span pt={0.5}>{props.value}</chakra.span>
    </HStack>
  );
};

export default ThumbIcon;
