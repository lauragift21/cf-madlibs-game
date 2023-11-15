import type { APIContext, APIRoute } from 'astro';

export interface Env {
  DB: D1Database;
}

export const get: APIRoute<Env> = async ({ locals }: APIContext) => {
  try {
    const { DB } = locals.runtime.env;

    // Prepare the SQL query for fetching data from the 'players' table
    const stmt = await DB.prepare('SELECT * FROM players');
    const { results } = await stmt.all();

    // Return the results as JSON
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET request error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
};


export const post: APIRoute<Env> = async ({request, locals}: APIContext) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    console.log('POST request:', { name, email })

    if (typeof name !== 'string' || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
      });
    }

    const { DB } = locals.runtime.env;
    console.log(DB)
    const stmt = await DB.prepare(
      `INSERT INTO players (name, email) VALUES (?, ?)`
    );
    const result = (await stmt.bind(name, email).run()).meta;
    console.log('Insert result:', result);

    return Response.redirect('/stories', 302);
  } catch (error) {
    console.error('POST request error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
};
