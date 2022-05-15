import NextLink from "next/link";
import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface NavItemProps extends FlexProps {
  href: string;
  icon: IconType;
  children: string | number;
}

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
            bg: "cyan.400",
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
