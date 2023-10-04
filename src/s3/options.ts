import type { S3Client } from "@aws-sdk/client-s3";

export type S3StorageOptions =
  | {
      client: S3Client;
      bucket: string;
    }
  | {
      endpoint?: string;
      region?: string;
      bucket: string;
      accessKey: string;
      secretKey: string;
    };
