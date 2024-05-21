import { Metadata } from "next";
import Profile from "../components/profile";

const title = "About Me";
const description = "About Tee Haow Jern";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  return (
    <section>
      {/* @ts-expect-error Server Component */}
      <Profile title={title} />
    </section>
  );
}
