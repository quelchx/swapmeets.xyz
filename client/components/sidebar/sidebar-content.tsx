import { SidebarProps } from "../../@types";
import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import SidebarItem from "./sidebar-item";
import SidebarRoutes from "../../routes/sidebar.routes";

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      py={4}
      {...rest}
    >
      <Flex
        h={{ sm: "10", md: 0 }}
        alignItems="center"
        mx="6"
        justifyContent="flex-start"
      >
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {SidebarRoutes.map((link) => (
        <SidebarItem href={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </SidebarItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
