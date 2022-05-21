import type { UserModel } from "../../@types";
import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import NextLink from "next/link";
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
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/router";
import Head from "../../components/head/head";
import capitalize from "../../helpers/captitalize";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const id = context.params.id;
  const { data } = await Axios.get(`/users/user/${id}`);
  const { data: meetings } = await Axios.get("/posts?author.id=" + data._id);

  return {
    props: {
      data,
      meetings,
    },
  };
};

const UserPage: NextPage<any> = ({ data, meetings }) => {
  const { user } = useAuthState();
  const { twitter, instagram, snapchat, facebook } = data.socials;
  const router = useRouter();
  return (
    <>
      <Head
        title={user.username}
        description={user.username + " Swap Meets Profile"}
      />
      <Flex direction={"column"}>
        {/* user heading */}
        <Flex
          p={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "space-between" }}
          rounded={"lg"}
          gap={{ base: 4, md: 0 }}
          alignItems={"center"}
        >
          <Flex
            direction={{ base: "column", sm: "row" }}
            alignItems={"center"}
            gap={{ base: 0, sm: 4 }}
          >
            <HStack gap={1}>
              <Box>
                <Avatar size="xl" name={data.username} />
              </Box>
              <VStack fontWeight="bold" alignItems={"flex-start"} spacing={-1}>
                <Heading size={"md"}>{data.username}</Heading>
                <Text fontSize={"xs"}>{data.email}</Text>
              </VStack>
            </HStack>
          </Flex>
          <Flex
            justifyContent={"center"}
            gap={2}
            alignItems="flex-start"
            direction={"column"}
          >
            <HStack gap={1}>
              <GenericIcon
                icon={<BsTwitter />}
                text={twitter ? twitter : "@" + data.username}
              />
              <GenericIcon
                icon={<BsFacebook />}
                text={facebook ? facebook : "@" + data.username}
              />
            </HStack>
            <HStack gap={1}>
              <GenericIcon
                icon={<BsSnapchat />}
                text={snapchat ? snapchat : "@" + data.username}
              />
              <GenericIcon
                icon={<BsInstagram />}
                text={instagram ? instagram : "@" + data.username}
              />
            </HStack>
          </Flex>
        </Flex>
        <Box>
          <Divider my={4} w="full" />
          <Grid
            gap={4}
            gridTemplateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(1, 1fr)",
            }}
          >
            <Flex direction={"column"} px="6" py={2} rounded={"md"}>
              <Heading>About {data.username}</Heading>
              <Flex py={2} gap={4}>
                <Box>
                  <GenericIcon
                    icon={<FaCity />}
                    text={data.city ? data.city : "City"}
                  />
                </Box>
                <Box>
                  <GenericIcon
                    icon={<FaLocationArrow />}
                    text={data.country ? data.country : "Country"}
                  />
                </Box>
                <Box>
                  <GenericIcon icon={<MdEvent />} text={meetings.length} />
                </Box>
                {user?.username === data.username && (
                  <Box
                    onClick={() => router.push(`/user/${user._id}/edit`)}
                    cursor="pointer"
                  >
                    <GenericIcon icon={<FiEdit />} text="Edit Profile" />
                  </Box>
                )}
              </Flex>
              <Box py={3}>
                <chakra.p>{data.bio}</chakra.p>
              </Box>
            </Flex>
            <VStack px="6" py={2} spacing={4} alignItems={"flex-start"}>
              <Heading>{capitalize(user.username)} Posts</Heading>
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
