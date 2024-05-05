import groq from "groq";
import { AuthorType, PostType } from "../types";
import sanityFetch from "./fetch";

export async function getPost(slug: string): Promise<PostType> {
  return await sanityFetch({
    query: groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "categories": categories[]->title,
    "authorImage": author->image,
    body,
    publishedAt
  }`,
    params: { slug },
  });
}

export async function getPostSlugs(): Promise<string[]> {
  return await sanityFetch({
    query: groq`*[_type == "post" && defined(slug.current)][].slug.current`,
  });
}

export async function getPostHeadings(): Promise<string[]> {
  const res = await sanityFetch({
    query: groq`*[ _type == "post" && defined(slug.current)][].slug.current ] {
      body,
      "headings": body[length(style) == 2 && string::startsWith(style, "h")]
    }`,
  });

  return res.headings ? res.headings : [];
}

export async function getPostsSorted(): Promise<PostType[]> {
  return await sanityFetch({
    query: groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc)`,
  });
}

export async function getMainAuthor(): Promise<AuthorType> {
  const authors: AuthorType[] = await sanityFetch({
    query: groq`*[_type == "author"]`,
  });

  const mainAuthor = authors.filter(
    (author) => author.slug.current == "tee-haow-jern"
  )[0];

  if (!mainAuthor) {
    throw new Error("Main author tee-haow-jern is not found!");
  }

  return mainAuthor;
}
