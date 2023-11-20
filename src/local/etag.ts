import { createHash } from "node:crypto";

// 5MB
const chunk = 1024 * 1024 * 5;

function md5(data: Uint8Array): string {
  return createHash("md5").update(data).digest("hex");
}

export function eTagOf(data: Uint8Array): string {
  if (data.length <= chunk) {
    return md5(data);
  }
  const md5Chunks = [];
  const chunksNumber = Math.ceil(data.length / chunk);
  for (let i = 0; i < chunksNumber; i++) {
    const chunkStream = data.slice(i * chunk, (i + 1) * chunk);
    md5Chunks.push(md5(chunkStream));
  }
  return `${md5(Buffer.from(md5Chunks.join(""), "hex"))}-${chunksNumber}`;
}
