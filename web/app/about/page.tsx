import { Metadata } from "next";
import Profile from "../components/profile";
import { getMainAuthor } from "../sanity/query";

const title = "About Me - Tee Haow Jern";

export async function generateMetadata(): Promise<Metadata> {
  const mainAuthor = await getMainAuthor();
  return {
    title,
    description: mainAuthor.description,
    openGraph: {
      title,
      description: mainAuthor.description,
      url: `/about`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page() {
  const mainAuthor = await getMainAuthor();

  return (
    <section>
      {/* @ts-expect-error Server Component */}
      <Profile author={mainAuthor} title={"About Me"} />
    </section>
  );
}
