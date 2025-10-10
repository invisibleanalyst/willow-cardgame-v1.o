import { auth } from '@clerk/nextjs/server';

export async function GET() {
  return new Response('Clerk auth route');
}

export async function POST() {
  return new Response('Clerk auth route');
}
