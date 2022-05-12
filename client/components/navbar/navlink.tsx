import React from "react";
import NextLink from "next/link";
import { Link, useColorModeValue } from "@chakra-ui/react";

export type Path = { href: string };

export interface NavLinkProps extends Path {
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <NextLink href={href}>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default NavLink;
