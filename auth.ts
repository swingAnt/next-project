import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,//来传播您的authConfig对象：
  providers: [
    Credentials({//添加providersNextAuth.js 选项。providers是一个数组，您在其中列出不同的登录选项，例如 Google 或 GitHub。在本课程中，我们将重点关注使用凭证提供程序仅有的。凭据提供程序允许用户使用用户名和密码登录。
      async authorize(credentials) {//您可以使用该authorize函数来处理身份验证逻辑。与服务器操作类似，您可以在zod检查用户是否存在于数据库中之前验证电子邮件和密码：
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
         // bcrypt.compare检查密码是否匹配：
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;

        }
 
   
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});