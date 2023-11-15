import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const runtime = context.locals.runtime;
  
  return new Response('Hello, world!');
}