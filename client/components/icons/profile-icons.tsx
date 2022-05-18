import {
  Box,
  chakra,
  Divider,
  Heading,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsFacebook, BsInstagram, BsSnapchat, BsTwitter } from "react-icons/bs";
import { IconComponent } from "../../@types";
import GenericIcon from "./generic-icon";

const ProfileIcons = ({ data }: any) => {
  const { twitter, tiktok, instagram, facebook, snapchat } = data.socials;

  return (
    <VStack alignItems={"flex-start"} p={4}>
      <Box borderBottomColor={"gray.400"} borderBottom="1px" mb={2}>
        <Heading>About {data.username}</Heading>
      </Box>
      <VStack alignItems={"flex-start"} gap={2}>
        {/* social icons */}
        <HStack gap={3} alignItems="flex-start">
          <GenericIcon
            icon={<BsInstagram size={20} />}
            text={instagram ? instagram : `@` + data.username}
          />
          <GenericIcon
            icon={<BsSnapchat size={20} />}
            text={snapchat ? snapchat : `@` + data.username}
          />
        </HStack>
        <GenericIcon
          icon={<BsTwitter size={20} />}
          text={twitter ? twitter : "http://twitter.com/you"}
        />
        <GenericIcon
          icon={<BsFacebook size={20} />}
          text={facebook ? facebook : "http://facebook.com/you"}
        />
      </VStack>
      <Divider w={"100%"} py={2} />
      <Box pt={4}>
        <Text fontSize="xl">Tell us about yourself</Text>
      </Box>
    </VStack>
  );
};

export default ProfileIcons;
