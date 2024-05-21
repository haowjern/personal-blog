import {
  PortableText,
  PortableTextBlockComponent,
  PortableTextListComponent,
  PortableTextMarkComponent,
  PortableTextReactComponents,
} from "@portabletext/react";
import {
  getPost,
  getPostSlugs,
  getPostTitleAndDescription,
} from "../../sanity/query";
import { formatDate, urlFor } from "../../utils";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import Link from "next/link";
import TableOfContents from "../../components/tableOfContents";
import { Metadata, ResolvingMetadata } from "next";

const imageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={urlFor(value).url()}
      width={width}
      height={height}
      alt={value.alt || " "}
      loading="lazy"
      className={isInline ? "inline-block" : "block"}
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

const linkComponent: PortableTextMarkComponent = ({ value, children }) => {
  const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
  return (
    <Link
      href={value.href}
      target={target}
      className="text-blue-300 visited:text-purple-500"
    >
      {children}
    </Link>
  );
};

const LinkContent = ({ id, children }) => {
  return (
    <>
      <a href={`#${id}`} aria-hidden="true" tabIndex={-1}>
        {children}
      </a>
    </>
  );
};

const blockComponent: Record<string, PortableTextBlockComponent> = {
  h1: ({ children }) => {
    const id = children[0].toLowerCase().replace(/\s+/g, "-");
    return (
      <h1 id={id}>
        <LinkContent id={id}>{children}</LinkContent>
      </h1>
    );
  },
  h2: ({ children }) => {
    const id = children[0].toLowerCase().replace(/\s+/g, "-");
    return (
      <h2 id={id}>
        <LinkContent id={id}>{children}</LinkContent>
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = children[0].toLowerCase().replace(/\s+/g, "-");
    return (
      <h3 id={id}>
        <LinkContent id={id}>{children}</LinkContent>
      </h3>
    );
  },
  h4: ({ children }) => {
    const id = children[0].toLowerCase().replace(/\s+/g, "-");
    return (
      <h4 id={id}>
        <LinkContent id={id}>{children}</LinkContent>
      </h4>
    );
  },
  h5: ({ children }) => {
    const id = children[0].toLowerCase().replace(/\s+/g, "-");
    return (
      <h5 id={id}>
        <LinkContent id={id}>{children}</LinkContent>
      </h5>
    );
  },
  h6: ({ children }) => {
    const id = children[0].toLowerCase().replace(/\s+/g, "-");
    return (
      <h6 id={id}>
        <LinkContent id={id} children={children} />
      </h6>
    );
  },
};

const portableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: linkComponent,
  },
  types: {
    image: imageComponent,
  },
  list: listComponent,
  block: blockComponent,
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const { title, description } = await getPostTitleAndDescription(slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
      <TableOfContents headings={post.headings} />
      <article className="prose">
        <PortableText value={post.body} components={portableTextComponents} />
      </article>
    </section>
  );
}
