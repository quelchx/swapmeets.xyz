import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";

import SidebarItem from "./sidebar-item";
import SidebarRoutes from "../../routes/sidebar.routes";
import { SidebarProps } from "../../@types";

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
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
