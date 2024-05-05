import Profile from "../components/profile";

export default async function Page() {
  return (
    <section>
      {/* @ts-expect-error Server Component */}
      <Profile />
    </section>
  );
}
