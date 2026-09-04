/**
 * NextAuth API Route
 * Handles authentication for admin dashboard
 */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Admin credentials - In production, store these in database
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  name: 'Admin User',
  role: 'admin',
};

const { handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          if (!ADMIN_CREDENTIALS.email || !ADMIN_CREDENTIALS.password || credentials.email !== ADMIN_CREDENTIALS.email) {
            return null;
          }

          const isValidPassword =
            credentials.password === ADMIN_CREDENTIALS.password;

          if (!isValidPassword) {
            return null;
          }

          return {
            id: '1',
            email: ADMIN_CREDENTIALS.email,
            name: ADMIN_CREDENTIALS.name,
            role: ADMIN_CREDENTIALS.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/en/auth/login',
    error: '/en/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const { GET, POST } = handlers;
