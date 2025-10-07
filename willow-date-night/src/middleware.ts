// Temporarily disabled Clerk middleware for testing
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const isPublicRoute = createRouteMatcher(['/', '/game', '/api/webhooks/clerk']);

// export default clerkMiddleware((auth, req) => {
//   if (!isPublicRoute(req)) auth().protect();
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };

// Temporary middleware function to satisfy Next.js requirements
export function middleware() {
  // Empty middleware - does nothing
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
