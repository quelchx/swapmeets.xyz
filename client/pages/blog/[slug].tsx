import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import matter from "gray-matter";
import { chakra, Box, Heading, Image, Stack, Divider } from "@chakra-ui/react";
import convertDate from "../../helpers/convert-date";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Page from "../../components/page/page";
import { BlogPageProps } from ".";
import { BlogPost } from "../../@types";

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("content"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  const markdown = fs.readFileSync(path.join("content", slug + ".md"), "utf-8");
  const { data, content } = matter(markdown);

  return { props: { data, slug, content } };
};

interface BlogPostProps {
  content: string;
  data: BlogPost;
}

const BlogPostPage: NextPage<BlogPostProps> = ({ data, content }) => {
  return (
    <>
      <Page title={data.title} description={data.excerpt} />
      <Box p={6}>
        <Heading>{data.title}</Heading>
        <chakra.p fontSize={18}>
          Posted on {data.date}, {convertDate(data.date)}
        </chakra.p>
        <Stack spacing={4} pt={3}>
          <chakra.p>{data.excerpt}</chakra.p>
          <Image
            roundedTop="lg"
            w="full"
            h={64}
            fit="cover"
            src={"." + data.image}
            alt="Article"
          />
        </Stack>
        <Divider py={4} />
        <Stack py={5}>
          <div
            className="md"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </Stack>
      </Box>
    </>
  );
};

export default BlogPostPage;
