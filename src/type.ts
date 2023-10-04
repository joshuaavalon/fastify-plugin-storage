import type { Readable } from "node:stream";

export interface Storage {
  write(key: string, input: StorageInput): Promise<void>;
  read(key: string): Promise<StorageOutput>;
  readMetadata(key: string): Promise<StorageMetadataOutput>;
}

export interface StorageInput {
  body: Buffer | Readable | Uint8Array | string;
  contentType?: string;
}

export interface StorageMetadataOutput {
  contentType?: string;
  contentLength?: number;
  eTag?: string;
  lastModified?: Date;
}

export interface StorageOutput extends StorageMetadataOutput {
  body: Uint8Array;
}
