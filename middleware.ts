import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { clerkApi } from '@clerk/nextjs/edge-middlewarefiles';
import { NextResponse } from 'next/server';

export default authMiddleware({
  // async afterAuth({ clerkUser, req, res }) {
  //   // '/admin' 경로에 대한 접근 제어
  //   if (req.url.startsWith('/admin')) {
  //     // Clerk 사용자의 역할을 확인하여 'admin'이 아닌 경우 접근을 거부
  //     if (!clerkUser.publicMetadata.roles.includes('admin')) {
  //       res.writeHead(302, { Location: '/login' });
  //       res.end();
  //       return { props: {} };
  //     }
  //   }
  // },

  publicRoutes: ['/', '/forget-password'],
});
// publicRoutes: ['/api/:path*'],

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
