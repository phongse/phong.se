import Link from "next/link";
import React from "react";
import PostType from "../../interfaces/post";
import { getAllPosts } from "../../lib/blog";
import dateFormat from "../../lib/dateFormat";

type Props = {
  allPosts: PostType[];
};

const BlogIndex = ({ allPosts }: Props) => {
  return (
    <>
      <div className="prose-sm mx-auto max-w-3xl mb-32">
        {allPosts.map((post) => (
          <div key={post.slug} className="mb-5">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold mt-0">
                <Link as={`/blog/${post.slug}`} href="/blog/[slug]">
                  <a className="text-gray-600 hover:text-gray-800 transition-all">
                    {post.title}
                  </a>
                </Link>
              </h3>
              <time className="text-gray-400" dateTime={post.date}>
                {post.date}
              </time>
            </div>
            <p className="text-base mt-0 leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogIndex;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "excerpt"]);

  return {
    props: { allPosts },
  };
};
