import Head from "next/head";
import PostType from "../../interfaces/post";
import { getAllPosts, getPostBySlug } from "../../lib/blog";
import markdownToHtml from "../../lib/markdown";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  return (
    <>
      <Head>
        <title>{`${post.title} | phong.se`}</title>
      </Head>
      <article className="prose mx-auto max-w-3xl mb-32">
        <time className="text-gray-400" dateTime={post.date}>
          {post.date}
        </time>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
