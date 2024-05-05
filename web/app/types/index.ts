// types/index.ts

import { SanityImageSource } from "@sanity/asset-utils";
import { PortableTextBlock } from "sanity";

export type PostType = {
  _id: string;
  title: string;
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
};

export type AuthorType = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: SanityImageSource;
  bio: PortableTextBlock;
};
