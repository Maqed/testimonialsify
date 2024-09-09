import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { env } from "@/env";
import { db } from "@/server/db";
import { UserUsage, User } from "@prisma/client";
import { kebabCase } from "@/lib/utils";
import { generateRandomNumbers } from "@/lib/utils"; // Import the new function

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      image: string;
      username: string;
      tierId: string;
      userUsage: UserUsage;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // role: UserRole;
    tierId: string;
    username: string;
    userUsage: UserUsage;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ user }) => {
      if (user) {
        if (!user.userUsage) {
          await db.userUsage.upsert({
            where: { userId: user.id },
            update: {},
            create: {
              userId: user.id,
              projects: 0,
              textReviews: 0,
              videoReviews: 0,
            },
          });
        }
        if (!user.username) {
          let baseUsername = kebabCase(user.name as string);
          let uniqueUsername = baseUsername;

          while (true) {
            const randomSuffix = generateRandomNumbers(4);
            uniqueUsername = `${baseUsername}-${randomSuffix}`;
            let existingUser: User | null = null;
            try {
              existingUser = await db.user.findUnique({
                where: { username: uniqueUsername },
              });
            } catch (error) {}

            if (!existingUser) {
              break;
            }
          }
          await db.user.update({
            where: { id: user.id },
            data: { username: uniqueUsername },
          });
        }
      }
      return true;
    },
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          tierId: user.tierId,
          userUsage: user.userUsage,
          username: user.username,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Google provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
