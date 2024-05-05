import {
  PortableText,
  PortableTextListComponent,
  PortableTextReactComponents,
} from "@portabletext/react";
import { getPost, getPostSlugs } from "../../sanity/query";
import { formatDate, urlFor } from "../../utils";
import { getImageDimensions } from "@sanity/asset-utils";

const imageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlFor(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url()}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
};

const listComponent: PortableTextListComponent = ({ value, children }) => {
  const { level, listItem } = value;

  if (listItem === "bullet") {
    return <ul className="list-disc list-inside">{children}</ul>;
  }

  if (listItem === "number") {
    if (level === 1) {
      return <ol className="list-decimal list-inside">{children}</ol>;
    } else if (level === 2) {
      return <ol className="list-alpha list-inside">{children}</ol>;
    }
  } else {
    // Handle other list types if needed
    return null;
  }
};

const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: imageComponent,
  },
  list: listComponent,
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// TODO: Add table of contents
export default async function Post({ params }) {
  const { slug = "" } = params;
  const post = await getPost(slug); 

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <PortableText value={post.body} components={portableTextComponents} />
      </article>
    </section>
  );
}
