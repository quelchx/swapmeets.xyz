import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Axios from "axios";
import { UserModel } from "../../../@types";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import InputSection from "../../../components/form/input-section";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
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
    revalidate: 10,
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
  const router = useRouter();
  const [consent, setConsent] = useState(false);

  const editUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await Axios.put("/users/" + data._id, {
        username: username.current.value,
        email: email.current.value,
        bio: bio.current.value,
        socials: {
          twitter: twitter.current.value,
          facebook: facebook.current.value,
          snapchat: snapchat.current.value,
          instagram: instagram.current.value,
          tiktok: tiktok.current.value,
        },
        city: city.current.value,
        country: country.current.value,
      });
      router.push("/user/" + data._id);
    } catch (err) {
      return router.push("/error");
    }
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
                  defaultValue={data.username}
                  ref={username}
                  type="text"
                  placeholder={data.username}
                />
              </InputSection>
              <InputSection width="60%" label="Email">
                <Input
                  defaultValue={data.email}
                  ref={email}
                  type="email"
                  placeholder={data.email}
                />
              </InputSection>
            </Flex>
            <InputSection label="About You">
              <Textarea
                minH={180}
                ref={bio}
                defaultValue={data.bio}
                placeholder={
                  data.bio ? data.bio : "Tell everyone about yourself"
                }
              />
            </InputSection>
            <Divider my={4} />
            <Heading size={"lg"}>Location</Heading>
            <Flex gap={3} direction={{ base: "column", md: "row" }}>
              <InputSection width="60%" label="City">
                <Input
                  ref={city}
                  defaultValue={data.city}
                  type="text"
                  placeholder="City"
                />
              </InputSection>
              <InputSection width="40%" label="Country">
                <Input
                  defaultValue={data.country}
                  ref={country}
                  type="text"
                  placeholder="Country"
                />
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
                  defaultValue={data.socials.twitter}
                  type="text"
                  placeholder={"twitter.com/" + data.username}
                />
              </InputSection>
              <InputSection width="50%" label="Facebook">
                <Input
                  ref={facebook}
                  defaultValue={data.socials.facebook}
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
                  defaultValue={data.socials.instagram}
                  type="text"
                  placeholder={"@" + data.username}
                />
              </InputSection>
              <InputSection width="33%" label="Snapchat">
                <Input
                  ref={snapchat}
                  defaultValue={data.socials.snapchat}
                  type="text"
                  placeholder={"@" + data.username}
                />
              </InputSection>
              <InputSection width="33%" label="TikTok">
                <Input
                  ref={tiktok}
                  defaultValue={data.socials.tiktok}
                  type="text"
                  placeholder={"@" + data.username}
                />
              </InputSection>
            </Flex>
            <Flex gap={3} direction={{ base: "column", md: "row" }}>
              <Button
                type="submit"
                minW={{ base: "full", sm: "100px" }}
                colorScheme={"blue"}
              >
                Save
              </Button>
              <Button disabled={!consent} colorScheme={"red"}>
                Delete
              </Button>
            </Flex>
            <Box>
              <Checkbox
                onChange={(e: any) => {
                  setConsent(e.target.checked);
                }}
                isChecked={consent}
                colorScheme={"green"}
              >
                I agree to delete my account
              </Checkbox>
            </Box>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default EditUser;
