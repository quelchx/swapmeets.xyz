import { HStack, Box } from "@chakra-ui/react";
import { MdLogin, MdAccountCircle } from "react-icons/md";
import NavLink from "../navbar/navlink";

const AuthRoutes = () => {
  return (
    <>
      <HStack>
        <Box pl={2}>
          <MdAccountCircle size={24} />
        </Box>
        <NavLink href="/register">Sign Up</NavLink>
      </HStack>
      <HStack>
        <Box pl={1}>
          <MdLogin size={24} />
        </Box>

        <NavLink href="/login">Login</NavLink>
      </HStack>
    </>
  );
};

export default AuthRoutes;
