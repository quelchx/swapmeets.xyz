import {
  useColorModeValue,
  Text,
  Box,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

import { FiHome, FiTrendingUp, FiCompass, FiStar } from "react-icons/fi";
import { ImFeed } from "react-icons/im";
import { MdPostAdd } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import SidebarItem from "./sidebar-item";
import { LinkItemProps, SidebarProps } from "../../@types";

const LinkItems: Array<LinkItemProps> = [
  { name: "Feed", icon: ImFeed },
  { name: "Create Post", icon: MdPostAdd },
  { name: "Create Meetup", icon: BsPeople },
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
