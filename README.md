# @joshuaavalon/fastify-plugin-storage

[![Version](https://badge.fury.io/js/@joshuaavalon%2Ffastify-plugin-storage.svg)](https://www.npmjs.com/package/@joshuaavalon/fastify-plugin-storage)
[![npm](https://img.shields.io/npm/dt/@joshuaavalon/fastify-plugin-storage.svg)](https://www.npmjs.com/package/@joshuaavalon/fastify-plugin-storage)
[![License](https://img.shields.io/github/license/joshuaavalon/fastify-plugin-storage)](./LICENSE)

## Getting Started

```sh
npm i @joshuaavalon/fastify-plugin-storage
```

## Usage

```typescript
import storagePlugin from "@joshuaavalon/fastify-plugin-storage";
await fastify.register(storagePlugin, opts);

await fastify.storage.write({ body: buffer, contentType: mime });
```

## Options
