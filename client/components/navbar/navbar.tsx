import React, { memo } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/auth";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Menu,
  Stack,
  Avatar,
  Center,
  HStack,
  IconButton,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

import NextLink from "next/link";
import NavList from "./navlist";
import ToggleTheme from "../toggle/theme";
import AuthRoutes from "./auth-routes";

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAuthDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, loading } = useAuthState();

  const logoutUser = async () => {
    try {
      await axios.get("/auth/logout");
      dispatch("LOGOUT");
      router.reload();
    } catch (err) {
      router.push("/error");
    }
  };

  return (
    <Box
      position="sticky"
      top={0}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      zIndex={20}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <HStack
            justifyContent={"space-between"}
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            <NavList />
            {!loading && (user ? <></> : <AuthRoutes />)}
          </HStack>
        </HStack>
        <Flex alignItems={"center"} gap={3}>
          <ToggleTheme />
          {user && (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} name={user.username} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"xl"} name={user.username} />
                </Center>
                <br />
                <Center>
                  <p>{user.username}</p>
                </Center>
                <Center>
                  <small>{user.email}</small>
                </Center>
                <MenuDivider />
                <NextLink href={`/user/${user._id}`}>
                  <MenuItem>Profile</MenuItem>
                </NextLink>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} direction="column-reverse" spacing={4}>
            <Box>
              <NavList />
            </Box>
            {!loading && (user ? <></> : <AuthRoutes />)}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default memo(Navbar);
