import { useColorModeValue, Flex, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { MobileProps } from "../../@types";

const MobileMenu = ({ onOpen, ...rest }: MobileProps) => {
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
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};

export default MobileMenu;
