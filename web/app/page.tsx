import { Posts } from "./components/posts";
import Profile from "./components/profile";

export default async function Index() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Tee Haow Jern
      </h1>
      <div className="my-8">
        {/* @ts-expect-error Server Component */}
        <Posts />
      </div>
    </section>
  );
}
