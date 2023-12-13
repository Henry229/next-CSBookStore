import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { clerkApi } from '@clerk/nextjs/edge-middlewarefiles';
import { NextResponse } from 'next/server';

export default authMiddleware({
  // ignoredRoutes: [
  // '/((?!api|trpc))(_next.*|.+.[w]+$)',
  // '/',
  // 'api/:path*',
  // ],
  // afterAuth(auth, req, evt) {
  //   // handle users who aren't authenticated

  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }
  //   // redirect them to organization selection page
  //   // if (
  //   //   auth.userId &&
  //   //   auth.orgId &&
  //   //   req.nextUrl.pathname !== '/org-selection'
  //   // ) {
  //   //   const categoriesPage = new URL(`/${auth.userId}/categories`, req.url);
  //   //   return NextResponse.redirect(categoriesPage);
  //   // }
  // },
  publicRoutes: [
    '/',
    '/forget-password',
    '/api/:path*',
    '/user_2YI1m7wbcDhtx0yXElecgDIapGh/:path*',
    '/books/:path*',
    // '/user_2YI1m7wbcDhtx0yXElecgDIapGh/categories',
  ],
});
// publicRoutes: ['/api/:path*'],

export const config = {
  // matcher: ['/((?!.+\\.[\\w]+$|_next|api).*)', '/'],
  // matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
