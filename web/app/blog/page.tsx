import { Posts } from "../components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <div className="my-8">
        {/* @ts-expect-error Server Component */}
        <Posts />
      </div>
    </section>
  );
}
