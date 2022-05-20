import {
  useColorModeValue,
  chakra,
  Box,
  Flex,
  Stack,
  Heading,
} from "@chakra-ui/react";

const BlogHero = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <chakra.header>
      <Box
        w="full"
        h="25vh"
        backgroundImage="url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
        bgPos="center"
        bgSize="cover"
      >
        <Flex
          align="center"
          pos="relative"
          justify="center"
          boxSize="full"
          bg="blackAlpha.700"
        >
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <Heading
              fontSize={["2xl", , "3xl"]}
              fontWeight="semibold"
              color="white"
              textTransform="uppercase"
            >
              Check out our{" "}
              <chakra.span color="blue.400" textDecor="underline">
                Stories
              </chakra.span>
            </Heading>
          </Stack>
        </Flex>
      </Box>
    </chakra.header>
  );
};

export default BlogHero;
