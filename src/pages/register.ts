import { players } from '../db/schema';
import { drizzle } from 'drizzle-orm/d1';
import type { APIContext, APIRoute } from 'astro';

export interface Env {
  DB: D1Database;
}

export const GET: APIRoute<Env> = async function get() {
  try {
      return Response.json({ message: 'Hello world!' });
  } catch (error) {
    return Response.json({ error });
  }
}

export const POST: APIRoute<Env> = async function post({
  request,
}) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const runtime = request.env;
    const db = drizzle(runtime);
    const result = await db.insert(players).values({ name, email });
    console.log(Response.json(result));

    // return Response.redirect('/success');
  } catch (error) {
    return Response.json({ error });
  }
};

// export async function GET(context: APIContext) {

//   // const formData = await context.formData();
//   // const name = formData.get('name') as string;
//   // const email = formData.get('email') as string;
//   // const db = drizzle(runtime.env.DB);
//   // // write data to the database
//   // const result = await db.insert(players).values({ name, email });
//   // console.log(Response.json(result));
//   // return Response.redirect('/');
//   return Response.json({ message: 'Hello world!' });

// }
