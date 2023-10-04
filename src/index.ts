import fp from "fastify-plugin";
import { S3Storage } from "./s3/index.js";

import type { StoragePluginOptions } from "./options.js";
import type { Storage } from "./type.js";

export type { StoragePluginOptions } from "./options.js";

const name = "@joshuaavalon/fastify-plugin-storage";
export default fp<StoragePluginOptions>(
  async (app, opts) => {
    const storage = new S3Storage(opts);
    app.decorate("storage", storage);
  },
  {
    name,
    fastify: "4.x",
    dependencies: [],
    decorators: {}
  }
);

declare module "fastify" {
  interface FastifyInstance {
    storage: Storage;
  }
}
