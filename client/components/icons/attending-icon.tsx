import { chakra, HStack } from "@chakra-ui/react";
import { MdEmojiPeople } from "react-icons/md";

type AttendingIconProps = {
  attending: number;
};

const AttendingIcon: React.FC<AttendingIconProps> = (props) => {
  return (
    <HStack cursor="pointer" spacing={1}>
      <MdEmojiPeople />
      <chakra.span pt={0.5}>{props.attending}</chakra.span>
    </HStack>
  );
};

export default AttendingIcon;
