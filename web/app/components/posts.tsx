import Link from "next/link";
import { getPostsSorted } from "../sanity/query";
import { formatDate } from "../utils";
import { Metadata, ResolvingMetadata } from "next";

export async function Posts() {
  const posts = await getPostsSorted();

  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug.current}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug.current}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(post.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
