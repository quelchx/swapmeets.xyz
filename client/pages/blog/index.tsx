import fs from "fs";
import path from "path";
import type { GetStaticProps, NextPage } from "next";

import {
  Box,
  chakra,
  Divider,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";

import BlogCard from "../../components/cards/blog-card";
import BlogHero from "../../components/hero/blog-hero";
import matter from "gray-matter";
import { ReactNode } from "react";

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join("content"));

  const posts = files.map((filename) => {
    const slug: string = filename.replace(".md", "");
    const content = fs.readFileSync(path.join("content", filename), "utf-8");
    const { data } = matter(content);

    return { data, slug };
  });

  return {
    props: {
      posts,
    },
  };
};
const BlogPage: NextPage = ({ posts }: any) => {
  console.log(posts);
  return (
    <Box p={6}>
      <Heading>Stories by Swap Meets</Heading>
      <chakra.p py={3} fontSize={22}>
        Check in to find out what has been going on with Swap Meets. Stay up to
        date with the latest events by reading our blogs.
      </chakra.p>
      <BlogHero />
      <Divider py={2} />
      <Grid
        mt={4}
        gap={3}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      >
        <>
          {posts && (
            <>
              {posts.map((post: any) => {
                const { image, title, excerpt, date, tag } = post.data;
                const { slug } = post;
                return (
                  <GridItem key={slug}>
                    <BlogCard
                      tag={tag}
                      image={image}
                      title={title}
                      excerpt={excerpt}
                      date={date}
                      slug={slug}
                    />
                  </GridItem>
                );
              })}
            </>
          )}
        </>
      </Grid>
    </Box>
  );
};

export default BlogPage;
