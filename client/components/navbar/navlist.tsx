import { useRouter } from "next/router";
import {
  chakra,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import NavLink from "./navlink";
import { MdSwapHorizontalCircle } from "react-icons/md";
import React from "react";

interface RouteProps {
  href: string;
  name: string;
}
export const NavbarRoutes: Array<RouteProps> = [
  { href: "/about", name: "About" },
  { href: "/contact", name: "Contact" },
];

const NavList = () => {
  return (
    <Flex alignItems={"flex-start"}>
      <Menu>
        <MenuButton
          ml={2}
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
                  as="div"
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

export default React.memo(NavList);
