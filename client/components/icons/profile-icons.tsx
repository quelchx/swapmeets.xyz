import GenericIcon from "./generic-icon";

import { Box, Divider, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { BsFacebook, BsInstagram, BsSnapchat, BsTwitter } from "react-icons/bs";

interface ProfileIconsProps {
  data: {
    username: string;
    socials?: {
      twitter: string;
      tiktok: string;
      instagram: string;
      facebook: string;
      snapchat: string;
    };
  };
}

const ProfileIcons: React.FC<ProfileIconsProps> = (props) => {
  const { twitter, tiktok, instagram, facebook, snapchat } = props.data.socials;

  return (
    <VStack alignItems={"flex-start"} p={4}>
      <Box borderBottomColor={"gray.400"} borderBottom="1px" mb={2}>
        <Heading>About {props.data.username}</Heading>
      </Box>
      <VStack alignItems={"flex-start"} gap={2}>
        <HStack gap={3} alignItems="flex-start">
          <GenericIcon
            icon={<BsInstagram size={20} />}
            text={instagram ? instagram : `@` + props.data.username}
          />
          <GenericIcon
            icon={<BsSnapchat size={20} />}
            text={snapchat ? snapchat : `@` + props.data.username}
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
