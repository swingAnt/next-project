import type { NextAuthConfig } from 'next-auth';
 
// export const authConfig = {
//   pages: {//您可以使用该pages选项指定自定义登录、注销和错误页面的路由。这不是必需的，但通过添加signIn: '/login'到我们的pages选项中，用户将被重定向到我们的自定义登录页面，而不是 NextAuth.js 默认页面。
//     signIn: '/login',
//   },
//   callbacks: {//添加逻辑来保护您的路由。这将阻止用户访问仪表板页面，除非他们已登录。

//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;