// lib/auth.ts (or lib/auth.js)
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prismadb from "@/lib/prismadb";
import { compare } from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and Password required');
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
        if (!isCorrectPassword) {
          throw new Error('Incorrect Password');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt', // Make sure 'jwt' is used here instead of a generic string
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
};
// @ts-ignore
export default NextAuth(authOptions);
