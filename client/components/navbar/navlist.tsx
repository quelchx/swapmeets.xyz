import React from "react";
import { useRouter } from "next/router";
import { Link, useColorModeValue } from "@chakra-ui/react";

import NavLink from "./navlink";
import NavbarRoutes from "../../routes/navbar.routes";

const NavList = () => {
  const router = useRouter();
  return (
    <>
      {NavbarRoutes.map((route) => (
        <NavLink href={route.href} key={`desktop-${route.name}`}>
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
      ))}
    </>
  );
};

export default NavList;
