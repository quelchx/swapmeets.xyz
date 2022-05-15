import React, { useEffect, useState } from "react";
import Axios from "axios";

import MeetingCard from "../cards/meeting-card";
import { PostModel } from "../../@types";
import { Box, chakra, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Feed = () => {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const response = await Axios.get("/posts");
      const data = await response.data;
      setPosts(data);
      setInterval(() => setLoading(false), 500);
    };
    getPosts();
  }, []);

  const skeleton = [1, 2, 3];

  if (isLoading) {
    return (
      <>
        {skeleton.map((skeleton) => (
          <Box key={skeleton} padding="6" my={2} boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ))}
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
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
