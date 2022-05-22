import { Link, useColorModeValue } from "@chakra-ui/react";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = (props) => {
  const router = useRouter()
  return (
    <NextLink href={props.href}>
      <Link
        as="div"
        px={2}
        py={1}
        rounded={"md"}
        color={router.asPath === props.href ? "blue.600" : "inherit"}
        _hover={{
          textDecoration: "none",
        }}
      >
        {props.children}
      </Link>
    </NextLink>
  );
};

export default NavLink;
