import React, { useEffect, useState } from "react";
import Axios from "axios";

import MeetingCard from "../cards/meeting-card";
import { PostModel } from "../../@types";
import { Box, chakra, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Feed = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      const { data } = await Axios.get("/posts");
      setPosts(data);
      setInterval(() => setLoading(false), 500);
    };
    getPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          {posts.map((post) => (
            <Box
              width="90%"
              key={`skeleton-${post._id}`}
              padding="6"
              my={2}
              boxShadow="lg"
              bg="white"
            >
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
          ))}
        </>
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
