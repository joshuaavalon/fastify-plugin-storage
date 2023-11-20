import { join } from "node:path";
import { readFile, stat, writeFile } from "node:fs/promises";
import sanitize from "sanitize-filename";
import { eTagOf } from "./etag.js";

import type { LocalStorageOptions } from "./options.js";
import type {
  Storage,
  StorageInput,
  StorageMetadataOutput,
  StorageOutput
} from "../type.js";

export * from "./options.js";
export class LocalStorage implements Storage {
  private readonly baseDir: string;
  public constructor(opts: LocalStorageOptions) {
    const { baseDir } = opts;
    this.baseDir = baseDir;
  }

  private assertValidKey(key: string): void {
    const sanitizeKey = key
      .split("/")
      .map(v => sanitize(v))
      .join("/");
    if (
      key !== sanitizeKey ||
      !join(this.baseDir, key).startsWith(this.baseDir)
    ) {
      throw new Error(`Invalid key (${key})`);
    }
  }

  public async write(key: string, input: StorageInput): Promise<void> {
    this.assertValidKey(key);
    const { body } = input;
    await writeFile(join(this.baseDir, key), body);
  }

  public async read(key: string): Promise<StorageOutput> {
    this.assertValidKey(key);
    const path = join(this.baseDir, key);
    const [body, stats] = await Promise.all([readFile(path), stat(path)]);
    const lastModified = stats.mtime;
    const contentLength = stats.size;
    const eTag = eTagOf(body);
    return { body, contentLength, eTag, lastModified };
  }

  public async readMetadata(key: string): Promise<StorageMetadataOutput> {
    this.assertValidKey(key);
    const path = join(this.baseDir, key);
    const [body, stats] = await Promise.all([readFile(path), stat(path)]);
    const lastModified = stats.mtime;
    const contentLength = stats.size;
    const eTag = eTagOf(body);
    return { contentLength, eTag, lastModified };
  }
}
