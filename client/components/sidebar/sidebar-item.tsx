import { NavItemProps } from "../../@types";
import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";

import NextLink from "next/link";

const SidebarItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <NextLink href={href}>
      <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "blue.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

export default SidebarItem;
