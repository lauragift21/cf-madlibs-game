/// <reference types="astro/client" />

type KVNamespace = import('@cloudflare/workers-types').KVNamespace;
type D1Database = import('@cloudflare/workers-types/experimental').D1Database;

type ENV = {
  KV: KVNamespace;
  DB: D1Database;
};

type Runtime = import('@astrojs/cloudflare').AdvancedRuntime<ENV>;

declare namespace App {
  interface Locals extends Runtime {}
}
