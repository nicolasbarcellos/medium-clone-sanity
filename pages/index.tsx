import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Posts from "../components/Posts";
import { sanityClient } from "../sanity";
import { Post } from "../typings";

interface PostsProps {
  posts: [Post];
}

export default function Home({ posts }: PostsProps) {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />
      <Posts posts={posts} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
  }`;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
