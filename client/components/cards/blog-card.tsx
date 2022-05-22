import {
  Flex,
  useColorModeValue,
  Box,
  Link,
  chakra,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";

interface BlogArticleProps {
  title: string;
  date: any;
  excerpt: string;
  image: string;
  slug: string;
  tag: string;
}

const BlogCard: React.FC<BlogArticleProps> = (props) => {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        rounded="lg"
        shadow="md"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
      >
        <Image
          roundedTop="lg"
          w="full"
          h={64}
          fit="cover"
          src={props.image}
          alt="Article"
        />

        <Box p={6}>
          <Box>
            <chakra.span
              fontSize="xs"
              textTransform="uppercase"
              color={useColorModeValue("brand.600", "brand.400")}
            >
              {props.tag}
            </chakra.span>
            <NextLink href={`/blog/${props.slug}`}>
              <Link
                as="div"
                display="block"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                fontSize="2xl"
                mt={2}
                _hover={{ color: "gray.600", textDecor: "underline" }}
              >
                {props.title}
              </Link>
            </NextLink>
            <chakra.p
              mt={2}
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {props.excerpt}
            </chakra.p>
          </Box>

          <Box mt={4}>
            <Flex alignItems="center">
              <Flex alignItems="center">
                <Image
                  h={10}
                  fit="cover"
                  rounded="full"
                  src="https://avatars.githubusercontent.com/u/74473426?v=4"
                  alt="Avatar"
                />
                <Link
                  mx={2}
                  fontWeight="bold"
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  Eric Quelch
                </Link>
              </Flex>
              <chakra.span
                mx={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.300")}
              >
                {props.date}
              </chakra.span>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default BlogCard;
