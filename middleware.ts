import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
 
// export default NextAuth(authConfig).auth;
export default()=>{}
//在这里，您使用该authConfig对象初始化 NextAuth.js 并导出该auth属性。

//使用中间件执行此任务的优点是，在中间件验证身份验证之前，受保护的路由甚至不会开始渲染，从而增强应用程序的安全性和性能。
export  const config = {
    //还可以使用matcher中间件中的选项来指定它应该在特定路径上运行。
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};