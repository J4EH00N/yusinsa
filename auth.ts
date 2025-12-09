import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db/drizzle';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcrypt-ts-edge';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                if (!email || !password) return null;

                const user = await db.query.users.findFirst({
                    where: eq(users.email, email)
                });

                if (!user || !user.password) return null;

                const isMatch = await compare(password, user.password);

                if (isMatch) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                }

                return null;
            }
        })
    ],
    callbacks: {
        ...authConfig.callbacks,
        async session({ session, user, trigger, token }: any) {
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            if (trigger === 'update') {
                session.user.name = user.name;
            }

            return session;
        },
        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.role = user.role;
            }
            if (trigger === 'update' && session?.user.name) {
                token.name = session.user.name;
            }
            return token;
        }
    }
});
