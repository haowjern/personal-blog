import { PortableText } from "@portabletext/react";
import { getMainAuthor } from "../sanity/query";
import Image from "next/image";
import { urlFor } from "../utils";
import { getImageDimensions } from "@sanity/asset-utils";

export default async function Profile({ title }) {
  const mainAuthor = await getMainAuthor();
  const imageDimensions = getImageDimensions(mainAuthor.image);

  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">{title}</h1>
      <div className="grid place-items-center my-4">
        <Image
          src={urlFor(mainAuthor.image).url()}
          width={imageDimensions.width * 0.3}
          height={imageDimensions.height * 0.3}
          alt="Picture of the author"
          placeholder="blur"
          blurDataURL={urlFor(mainAuthor.image)
            .width(24)
            .height(24)
            .blur(10)
            .url()}
          className="rounded-xl"
        />
      </div>
      <article className="prose">
        <PortableText value={mainAuthor.bio} />
      </article>
    </>
  );
}
