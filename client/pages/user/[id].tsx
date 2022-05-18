import type { UserModel } from "../../@types";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Axios from "axios";
import {
  Avatar,
  Box,
  HStack,
  Text,
  chakra,
  Flex,
  VStack,
  Divider,
  Grid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { BsFacebook, BsInstagram, BsSnapchat, BsTwitter } from "react-icons/bs";
import { useAuthState } from "../../context/auth";
import MeetingCard from "../../components/cards/meeting-card";
import { FaCity, FaLocationArrow } from "react-icons/fa";
import GenericIcon from "../../components/icons/generic-icon";
import { MdEvent, MdWorkOutline } from "react-icons/md";
import NextLink from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await Axios.get("/users");
  const data = await res.data;
  const paths = data.map((user: UserModel) => {
    return { params: { id: user._id } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.id;

  // current user
  const { data } = await Axios.get(`/users/user/${id}`);
  // const data: UserModel = await user.data;

  // all of the users posted meets
  const { data: meetings } = await Axios.get("/posts?author.id=" + data._id);

  return {
    props: {
      data,
      meetings,
    },
    revalidate: 120,
  };
};

const UserPage: NextPage<any> = ({ data, meetings }) => {
  const { user } = useAuthState();
  return (
    <>
      <Flex direction={"column"}>
        {/* user heading */}
        <Flex p={4} justifyContent="space-between" rounded={"lg"}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            alignItems={"center"}
            gap={{ base: 0, sm: 4 }}
          >
            <HStack gap={1}>
              <Box>
                <Avatar size="xl" name={data.username}  />
              </Box>
              <VStack fontWeight="bold" alignItems={"flex-start"} spacing={-1}>
                <Heading size={"md"}>{data.username}</Heading>
                <Text fontSize={"xs"}>{data.email}</Text>
              </VStack>
            </HStack>
          </Flex>
          <Flex direction={"column"}>
            <HStack gap={1}>
              <GenericIcon icon={<BsTwitter />} text={"twitter"} />
              <GenericIcon icon={<BsFacebook />} text={"facebook"} />
            </HStack>
            <HStack gap={3}>
              <GenericIcon icon={<BsSnapchat />} text="snapchat" />
              <GenericIcon icon={<BsInstagram />} text="instagram" />
            </HStack>
            {/* if user show this otherwise hide */}
            {user && (
              <>
                {user._id === data._id && (
                  <HStack pt={3} alignSelf="flex-end">
                    <Button size={'sm'} colorScheme={'blue'}>
                      <NextLink href={`/user/${user._id}/edit`}>Edit</NextLink>
                    </Button>
                  </HStack>
                )}
              </>
            )}
          </Flex>
        </Flex>
        <Box>
          <Divider my={4} w="full" />
          <Grid
            gap={4}
            gridTemplateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
          >
            <Flex direction={"column"} px="6" py={2} rounded={"md"}>
              <Heading>About Username</Heading>
              <Flex gap={8}>
                <Box>
                  <GenericIcon icon={<FaCity />} text="City" />
                </Box>
                <Box>
                  <GenericIcon icon={<FaLocationArrow />} text="Country" />
                </Box>
                <Box>
                  <GenericIcon icon={<MdEvent />} text={meetings.length} />
                </Box>
                <Box>
                  <GenericIcon icon={<MdWorkOutline />} text="Work" />
                </Box>
              </Flex>
              <Box py={3}>
                <chakra.p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Tempora illum, dolorem debitis porro error adipisci tempore
                  maxime, eaque alias sapiente quibusdam molestias iste atque
                  soluta repudiandae pariatur harum voluptate omnis.
                </chakra.p>
              </Box>
            </Flex>
            <VStack px="6" py={2} spacing={4} alignItems={"flex-start"}>
              <Heading>Your Posts</Heading>
              {meetings.map((post: any) => (
                <MeetingCard key={post._id} post={post} />
              ))}
            </VStack>
          </Grid>
        </Box>
      </Flex>
    </>
  );
};

export default UserPage;
