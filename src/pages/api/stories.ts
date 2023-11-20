import type { APIContext, APIRoute } from "astro";

export interface Env {
  KV: KVNamespace;
}

export const GET: APIRoute<Env> = async ({ locals }: APIContext) => {
  try {
    const env = locals.runtime.env;
    const value = await env.KV.list();
    console.log('Keys:', value.keys)
    if (value.keys.length === 0) {
      return new Response('No keys found', { status: 404 });
    }

    const promises = value.keys.map(async (key) => {
      const value = await env.KV.get(key.name);
      return value;
    });

    const values = await Promise.all(promises);
    return new Response(JSON.stringify(values));

  } catch (error) {
    console.error('POST request error', error);
    return new Response(JSON.stringify(error));
  }
};