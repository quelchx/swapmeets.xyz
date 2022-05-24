import {
  useColorModeValue,
  Flex,
  IconButton,
  FlexProps,
} from "@chakra-ui/react";
import { BsArrowBarLeft } from "react-icons/bs";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileMenu = ({ onOpen, ...rest }: MobileProps) => {
  const btn = useColorModeValue("gray.600", "gray.400");
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      {/* <Text fontSize="2xl" mr="6" fontFamily="monospace" fontWeight="bold">
        DevMeets
      </Text> */}
      <IconButton
        variant="outline"
        borderColor={btn}
        colorScheme={"gray"}
        onClick={onOpen}
        aria-label="open menu"
        icon={<BsArrowBarLeft />}
      />
    </Flex>
  );
};

export default MobileMenu;
