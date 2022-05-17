import {
  Box,
  chakra,
  useColorModeValue,
  Image,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";

const ProfileCard = ({ data }: any) => {
  const { avatar, username, email } = data;
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        w="sm"
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Image
          w="full"
          h={56}
          fit="contain"
          objectPosition="center"
          src={avatar}
          alt="avatar"
        />

        <Flex alignItems="center" px={6} py={3} bg="blue.700">
          <Icon as={MdHeadset} h={6} w={6} color="white" />
          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
            Changable Status
          </chakra.h1>
        </Flex>

        <Box py={4} px={6}>
          <chakra.h1
            fontSize="xl"
            fontWeight="bold"
            color={useColorModeValue("gray.800", "white")}
          >
            {username}
          </chakra.h1>

          <chakra.p py={2} color={useColorModeValue("gray.700", "gray.400")}>
            User Snippet
          </chakra.p>

          <Flex
            alignItems="center"
            mt={4}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />
            <chakra.h1 px={2} fontSize="sm">
              Job Plug
            </chakra.h1>
          </Flex>

          <Flex
            alignItems="center"
            mt={4}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            <Icon as={MdLocationOn} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              User Location
            </chakra.h1>
          </Flex>
          <Flex
            alignItems="center"
            mt={4}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            <Icon as={MdEmail} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              {email}
            </chakra.h1>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProfileCard;
