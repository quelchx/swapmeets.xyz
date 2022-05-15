import React from "react";
import NavLink from "./navlink";

import { useRouter } from "next/router";
import { Link, useColorModeValue } from "@chakra-ui/react";
import { RouteProps } from "../../@types";

const Routes: Array<RouteProps> = [
  { href: "/", name: "Home" },
  { href: "/about", name: "About" },
  { href: "/contact", name: "Contact" },
];

const NavList = () => {
  const router = useRouter();
  return (
    <>
      {Routes.map((route) => (
        <NavLink href={route.href} key={`desktop-${route.name}`}>
          <Link
            color={
              router.asPath === route.href
                ? useColorModeValue("blue.600", "blue.200")
                : "inherit"
            }
            _hover={{ textDecoration: "none" }}
          >
            {route.name}
          </Link>
        </NavLink>
      ))}
    </>
  );
};

export default NavList;
