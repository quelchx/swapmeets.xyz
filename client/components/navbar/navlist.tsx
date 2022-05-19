import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Center,
  chakra,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";

import NavLink from "./navlink";
import NavbarRoutes from "../../routes/navbar.routes";
import { MdSwapHorizontalCircle } from "react-icons/md";

const NavList = () => {
  const router = useRouter();
  return (
    <Flex alignItems={"flex-start"}>
      <Menu>
        <MenuButton
          ml={2}
          mt={{ base: 2, md: 0 }}
          rounded={"full"}
          cursor={"pointer"}
          minW={0}
        >
          <HStack>
            <MdSwapHorizontalCircle size={24} />
            <chakra.span color={"inherit"}>Swap Meets</chakra.span>
          </HStack>
        </MenuButton>
        <MenuList alignItems={"center"}>
          {NavbarRoutes.map((route) => (
            <MenuItem key={`desktop-${route.name}`}>
              <NavLink href={route.href}>
                <Link
                  color={
                    router.asPath === route.href
                      ? useColorModeValue("blue.600", "blue.200")
                      : "inherit"
                  }
                  _hover={{ textDecoration: "none" }}
                >
                  {route?.name}
                </Link>
              </NavLink>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavList;
