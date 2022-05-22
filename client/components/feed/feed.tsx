import { useEffect, useState } from "react";
import {
  Box,
  chakra,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";

import Axios from "axios";
import MeetingCard from "../cards/meeting-card";
import { PostModel } from "../../@types";

const Feed = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      const { data } = await Axios.get("/posts");
      setPosts(data);
      setLoading(false);
    };
    getPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box display="grid" placeItems="center" height="55vh">
          <VStack>
            <Heading py={2}>Fetching Latest Meetups</Heading>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </VStack>
        </Box>
      ) : (
        <>
          {posts && (
            <chakra.div p={2} mt={4}>
              {posts.map((post) => (
                <MeetingCard key={post._id} post={post} />
              ))}
            </chakra.div>
          )}
        </>
      )}
    </>
  );
};

export default Feed;
