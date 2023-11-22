import type { APIContext, APIRoute } from 'astro';

export interface Env {
  KV: KVNamespace;
}

export const GET: APIRoute<Env> = async ({ locals }: APIContext) => {
  try {
    const env = locals.runtime.env;
    const values = await env.KV.list();

    if (!values.keys || values.keys.length === 0) {
      return new Response('No keys found', { status: 404 });
    }

    const promises = values.keys.map(async (key) => {
      const value = await env.KV.get(key.name);
      return value;
    });

    const response = await Promise.all(promises);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET request error', error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
