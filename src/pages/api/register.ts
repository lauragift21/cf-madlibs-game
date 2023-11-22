import type { APIContext, APIRoute } from 'astro';

export interface Env {
  DB: D1Database;
  CF_PAGES_URL: string;
}

export const POST: APIRoute<Env> = async ({ request, locals }: APIContext) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');

    if (typeof name !== 'string' || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
      });
    }

    const { DB, CF_PAGES_URL } = locals.runtime.env;
    const stmt = await DB.prepare(
      `INSERT INTO players (name, email) VALUES (?, ?)`
    );
    await stmt.bind(name, email).run();

    const baseUrl = CF_PAGES_URL || 'http://localhost:8788';

    return Response.redirect(`${baseUrl}/stories`, 301);
  } catch (error) {
    console.error('POST request error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
};
