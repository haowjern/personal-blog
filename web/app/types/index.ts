// types/index.ts

import { SanityImageSource } from "@sanity/asset-utils";
import { PortableTextBlock, PortableTextTextBlock } from "sanity";

export type PostType = {
  _id: string;
  title: string;
  description: string;
  name: string;
  categories: string[];
  authorImage: {
    alt: string;
    image: string;
  };
  body: PortableTextBlock;
  slug: {
    current: string;
  };
  publishedAt: string;
  headings: PortableTextTextBlock[];
};

export type AuthorType = {
  _id: string;
  name: string;
  description: string;
  slug: {
    current: string;
  };
  image: SanityImageSource;
  bio: PortableTextBlock;
};
