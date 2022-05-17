import { NavLinkProps } from "../../@types";
import { Link, useColorModeValue } from "@chakra-ui/react";

import NextLink from "next/link";

const NavLink = ({ href, children }: NavLinkProps) => (
  <NextLink href={href}>
    <Link
      as="div"
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
