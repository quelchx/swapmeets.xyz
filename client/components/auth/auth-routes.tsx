import { HStack, Box, Link } from "@chakra-ui/react";
import { MdLogin, MdAccountCircle } from "react-icons/md";
import NavLink from "../navbar/navlink";

const AuthRoutes = () => {
  return (
    <>
      <HStack>
        <Box pl={2}>
          <MdAccountCircle size={24} />
        </Box>
        {/* register has to be a regular link because the page needs a refresh to register google recaptcha */}
        <Link href="/register">Sign Up</Link>
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
