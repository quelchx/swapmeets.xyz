import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import Axios from "axios";
import {
  Box,
  Button,
  chakra,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import InputSection from "../../../components/form/input-section";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "../../../context/auth";
import NextLink from "next/link";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const id = context.params.id;
  const { data } = await Axios.get("/users/user/" + id);

  return {
    props: { data },
  };
};

type InputReference = React.MutableRefObject<HTMLInputElement>;
type TextareaReference = React.MutableRefObject<HTMLTextAreaElement>;

const EditUser: NextPage<any> = ({ data }) => {
  const { user } = useAuthState();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

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

  if (user === null) {
    return (
      <chakra.div display="grid" placeItems="center" height="80vh">
        <Box textAlign="center" py={10} px={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, red.400, red.600)"
            backgroundClip="text"
          >
            Error
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Something went wrong
          </Text>
          <Text color={"gray.500"} mb={6}>
            To report this error please refer to the contact page and let us
            know what happened
          </Text>

          <Button
            colorScheme="red"
            bgGradient="linear(to-r, red.400, red.500, red.600)"
            color="white"
            variant="solid"
          >
            <NextLink href="/">Go To Home</NextLink>
          </Button>
        </Box>
      </chakra.div>
    );
  }
  return (
    <>
      {user && (
        <>
          {user._id === data._id && (
            <Box p={6}>
              <Heading>Edit Your Profile</Heading>
              <form onSubmit={editUser}>
                <Box my={5}>
                  <Flex gap={4} direction={"column"}>
                    <Flex
                      gap={3}
                      direction={{ base: "column", md: "row" }}
                      w={"full"}
                    >
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
          )}
        </>
      )}
    </>
  );
};

export default EditUser;
