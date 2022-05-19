import { SidebarProps } from "../../@types";
import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
  Link,
  HStack,
} from "@chakra-ui/react";
import Axios from "axios";
import SidebarItem from "./sidebar-item";
import SidebarRoutes from "../../routes/sidebar.routes";
import NextLink from "next/link";
import { BsDoorClosed, BsPerson } from "react-icons/bs";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useRouter } from "next/router";

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const router = useRouter();

  const logout = () => {
    Axios.get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        router.push("/error");
      });
  };

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
        <Text fontSize="2xl" fontWeight="bold">
          Swap Meets
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
