import { players } from '../db/schema';
import { drizzle } from 'drizzle-orm/d1';
import type { APIContext, APIRoute } from 'astro';

export interface Env {
  DB: D1Database;
}

export const GET: APIRoute<Env> = async function get({locals} : APIContext) {
  try {
    const env = locals.runtime.env;
    const db = drizzle(env.DB);
    const results = await db.select().from(players).all();
    console.log(results);
    return Response.json(results);
  } catch (error) {
    return Response.json({ error });
  }
};

export const POST: APIRoute<Env> = async function post({
  request, locals,
}: APIContext) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const env = locals.runtime.env;
    const db = drizzle(env.DB);
    const result = await db.insert(players).values({ name, email });
    console.log(Response.json(result));
    return Response.redirect('/success');
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
};
