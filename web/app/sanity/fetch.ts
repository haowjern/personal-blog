import client from "./client";

export default async function sanityFetch({
  query,
  params = {},
  perspective = "published",
  stega = false,
}) {
  if (perspective === "previewDrafts") {
    return client.fetch<any>(query, params, {
      stega,
      perspective: "previewDrafts",

      // The `previewDrafts` perspective isn't available on the API CDN
      useCdn: false,
      // And we can't cache the responses as it would slow down the live preview experience
      next: { revalidate: 0 },
    });
  }
  return client.fetch<any>(query, params, {
    stega,
    perspective: "published",
    // The `published` perspective is available on the API CDN
    useCdn: true,
    // Only enable Stega in production if it's a Vercel Preview Deployment, as the Vercel Toolbar supports Visual Editing
    // When using the `published` perspective we use time-based revalidation to match the time-to-live on Sanity's API CDN (60 seconds)
    next: { revalidate: 60 },
  });
}
