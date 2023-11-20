import type { S3StorageOptions } from "./s3/index.js";
import type { LocalStorageOptions } from "./local/index.js";

export type StoragePluginOptions =
  | (LocalStorageOptions & { type: "local" })
  | (S3StorageOptions & { type: "s3" });
