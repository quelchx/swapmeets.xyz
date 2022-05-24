import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/react";
import SidebarItem from "./sidebar-item";

import { FaBlog } from "react-icons/fa";
import { FiCompass } from "react-icons/fi";
import { ImFeed, ImInfo } from "react-icons/im";
import { MdOutlineContactSupport, MdPostAdd } from "react-icons/md";
import { IconType } from "react-icons";

type LinkItemProps = {
  name: string;
  icon: IconType;
  href: string;
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarRoutes: Array<LinkItemProps> = [
  { name: "Feed", icon: ImFeed, href: "/feed" },
  { name: "Create Post", icon: MdPostAdd, href: "/meetup/create" },
  { name: "Explore Meetups", icon: FiCompass, href: "/explore" },
  { name: "Blog", icon: FaBlog, href: "/blog" },
  { name: "About", icon: ImInfo, href: "/about" },
  { name: "Contact", icon: MdOutlineContactSupport, href: "/contact" },
];

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
        <SidebarItem
          onClick={onClose}
          href={link.href}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </SidebarItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
