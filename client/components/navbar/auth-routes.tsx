import { HStack, Box } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { MdLogin, MdAccountCircle } from "react-icons/md";

const AuthRoutes = () => {
  return (
    <>
      <HStack>
        <Box pl={2}>
          <MdAccountCircle size={24} />
        </Box>
        <Link href="/register">Sign Up</Link>
      </HStack>
      <HStack>
        <Box pl={1}>
          <MdLogin size={24} />
        </Box>
        <Link href="/login">Login</Link>
      </HStack>
    </>
  );
};

export default memo(AuthRoutes);
