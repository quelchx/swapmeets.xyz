import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Axios from "axios";
import { UserModel } from "../../../@types";
import {
  Avatar,
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import InputSection from "../../../components/form/input-section";
import { FormEvent, useRef } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await Axios.get("/users");
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
  const { data } = await Axios.get("/users/user/" + id);

  return {
    props: { data },
    revalidate: 120,
  };
};

type InputReference = React.MutableRefObject<HTMLInputElement>;
type TextareaReference = React.MutableRefObject<HTMLTextAreaElement>;

const EditUser: NextPage<any> = ({ data }) => {
  const username = useRef() as InputReference;
  const email = useRef() as InputReference;
  const bio = useRef() as TextareaReference;
  const facebook = useRef() as InputReference;
  const tiktok = useRef() as InputReference;
  const twitter = useRef() as InputReference;
  const snapchat = useRef() as InputReference;
  const instagram = useRef() as InputReference;
  const city = useRef() as InputReference;
  const country = useRef() as InputReference;

  const editUser = async (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <Box p={6}>
      <Heading>Edit Your Profile</Heading>
      <form onSubmit={editUser}>
        <Box my={5}>
          <Flex gap={4} direction={"column"}>
            <Flex gap={3} direction={{ base: "column", md: "row" }} w={"full"}>
              <InputSection width="40%" label="Username">
                <Input
                  value={data.username}
                  ref={username}
                  type="text"
                  placeholder={data.username}
                />
              </InputSection>
              <InputSection width="60%" label="Email">
                <Input
                  value={data.email}
                  ref={email}
                  type="email"
                  placeholder={data.email}
                />
              </InputSection>
            </Flex>
            <InputSection label="Avatar">
              <HStack gap={4}>
                <Avatar size={"lg"} src={data.avatar} />
                <Button colorScheme={"blue"} className="file-upload">
                  <chakra.label cursor="pointer">
                    Upload Image
                    <Input type="file" />
                  </chakra.label>
                </Button>
              </HStack>
            </InputSection>
            <InputSection label="About You">
              <Textarea
                minH={180}
                ref={bio}
                placeholder={
                  data.user?.details
                    ? data.user?.details
                    : "Tell everyone about yourself"
                }
              />
            </InputSection>
            <Divider my={4} />
            <Heading size={"lg"}>Location</Heading>
            <Flex gap={3} direction={{ base: "column", md: "row" }}>
              <InputSection width="60%" label="City">
                <Input ref={city} type="text" placeholder="City" />
              </InputSection>
              <InputSection width="40%" label="Country">
                <Input ref={country} type="text" placeholder="Country" />
              </InputSection>
            </Flex>
            <Divider my={4} />
            <Heading size={"lg"}>Social Links</Heading>
            <Flex
              gap={{ base: 1.5, md: 3 }}
              direction={{ base: "column", md: "row" }}
            >
              <InputSection width="50%" label="Twitter">
                <Input
                  ref={twitter}
                  value={data.socials.twitter}
                  type="text"
                  placeholder={"twitter.com/" + data.username}
                />
              </InputSection>
              <InputSection width="50%" label="Facebook">
                <Input
                  ref={facebook}
                  value={data.socials.facebook}
                  type="text"
                  placeholder={"facebook.com/" + data.username}
                />
              </InputSection>
            </Flex>
            <Flex
              gap={{ base: 1.5, md: 3 }}
              direction={{ base: "column", sm: "row" }}
            >
              <InputSection width="33%" label="Instagram">
                <Input
                  ref={instagram}
                  value={data.socials.instagram}
                  type="text"
                  placeholder={"@" + data.username}
                />
              </InputSection>
              <InputSection width="33%" label="Snapchat">
                <Input
                  ref={snapchat}
                  value={data.socials.snapchat}
                  type="text"
                  placeholder={"@" + data.username}
                />
              </InputSection>
              <InputSection width="33%" label="TikTok">
                <Input
                  ref={tiktok}
                  value={data.socials.tiktok}
                  type="text"
                  placeholder={"@" + data.username}
                />
              </InputSection>
            </Flex>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 2, sm: 4 }}
              justifyContent={"flex-start"}
            >
              <Button
                type="submit"
                minW={{ base: "full", sm: "100px" }}
                colorScheme={"blue"}
              >
                Save
              </Button>
              <Button
                disabled={true}
                minW={{ base: "full", sm: "100px" }}
                colorScheme={"red"}
              >
                Delete Account
              </Button>
            </Flex>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default EditUser;
