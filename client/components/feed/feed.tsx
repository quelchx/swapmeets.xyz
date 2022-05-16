import React, { useEffect, useState } from "react";
import Axios from "axios";

import MeetingCard from "../cards/meeting-card";
import { PostModel } from "../../@types";
import {
  Box,
  Center,
  chakra,
  SkeletonCircle,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";

const Feed = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      const { data } = await Axios.get("/posts");
      setPosts(data);
      setInterval(() => setLoading(false), 1200);
    };
    getPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box display="grid" placeItems="center" height="75vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <>
          {posts && (
            <chakra.div mt={4}>
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
