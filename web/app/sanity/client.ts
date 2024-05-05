// client.ts

import { createClient, type ClientConfig } from "@sanity/client";



const config: ClientConfig = {
  projectId: "dhou6zuv",
  dataset: "production",
  apiVersion: "2023-07-16",
  useCdn: false,
};

const client = createClient(config);

export default client;
