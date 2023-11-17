import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({ publicRoutes: ['/', '/forget-password'] });
// publicRoutes: ['/api/:path*'],

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
