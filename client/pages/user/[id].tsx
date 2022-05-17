import type { IconComponent, UserModel } from "../../@types";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { ReactNode } from "react";
import Axios from "axios";
import ProfileCard from "../../components/cards/profile-card";
import {
  Box,
  chakra,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { BsFacebook, BsInstagram, BsSnapchat, BsTwitter } from "react-icons/bs";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await Axios.get("/users");
  const data = await res.data;
  const paths = data.map((user: UserModel) => {
    return { params: { id: user._id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await Axios.get(`/users/user/${id}`);
  const data: UserModel = await res.data;
  return {
    props: {
      data,
    },
  };
};

const SocialIcon = ({ icon, text }: IconComponent) => {
  const Icon = () => icon;
  return (
    <HStack gap={1} justify="flex-start" alignItems={"center"} width="100%">
      <Box pt={0.5}>
        <Icon />
      </Box>
      <Box>
        <chakra.p fontFamily={"monospace"} fontSize={14} pt={0.5}>
          {text}
        </chakra.p>
      </Box>
    </HStack>
  );
};

const UserPage: NextPage<any> = ({ data }) => {
  const { twitter, tiktok, instagram, facebook, snapchat } = data.socials;
  return (
    <HStack gap={4} alignItems="flex-start">
      <ProfileCard data={data} />
      <VStack alignItems={"flex-start"} p={4}>
        <Box borderBottomColor={"gray.400"} borderBottom="1px" mb={2}>
          <Heading>About {data.username}</Heading>
        </Box>
        <VStack alignItems={"flex-start"} gap={2}>
          <HStack gap={6} alignItems="flex-start">
            <SocialIcon
              icon={<BsInstagram size={20} />}
              text={instagram ? instagram : `@` + data.username}
            />
            <SocialIcon
              icon={<BsSnapchat size={20} />}
              text={snapchat ? snapchat : `@` + data.username}
            />
          </HStack>
          <SocialIcon
            icon={<BsTwitter size={20} />}
            text={twitter ? twitter : "http://twitter.com/you"}
          />
          <SocialIcon
            icon={<BsFacebook size={20} />}
            text={facebook ? facebook : "http://facebook.com/you"}
          />
        </VStack>
      </VStack>
    </HStack>
  );
};

export default UserPage;
