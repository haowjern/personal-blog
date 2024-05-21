import { Metadata, ResolvingMetadata } from "next";
import { Posts } from "../components/posts";

const title = "My Blog";
const description = "A collection of blog posts by Tee Haow Jern";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">{title}</h1>
      <div className="my-8">
        {/* @ts-expect-error Server Component */}
        <Posts />
      </div>
    </section>
  );
}
