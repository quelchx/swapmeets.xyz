import {
  useColorModeValue,
  Text,
  Box,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

import { FiHome, FiTrendingUp, FiCompass, FiStar } from "react-icons/fi";

import SidebarItem from "./sidebar-item";
import { LinkItemProps, SidebarProps } from "../../@types";

const LinkItems: Array<LinkItemProps> = [
  { name: "Feed", icon: FiHome },
  { name: "Create Post", icon: FiTrendingUp },
  { name: "Create Meetup", icon: FiStar },
  { name: "Explore Meetups", icon: FiCompass },
];

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
      {LinkItems.map((link) => (
        <SidebarItem key={link.name} icon={link.icon}>
          {link.name}
        </SidebarItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
