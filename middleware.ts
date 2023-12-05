import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { clerkApi } from '@clerk/nextjs/edge-middlewarefiles';
import { NextResponse } from 'next/server';

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect them to organization selection page
    // if (
    //   auth.userId &&
    //   auth.orgId &&
    //   req.nextUrl.pathname !== '/org-selection'
    // ) {
    //   const categoriesPage = new URL(`/${auth.userId}/categories`, req.url);
    //   return NextResponse.redirect(categoriesPage);
    // }
  },
  publicRoutes: ['/', '/forget-password'],
});
// publicRoutes: ['/api/:path*'],

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
