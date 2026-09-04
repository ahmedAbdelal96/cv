/**
 * NextAuth Configuration
 * Handles authentication for admin dashboard
 */
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';

// Admin credentials - In production, store these in database
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  name: 'Admin User',
  role: 'admin',
};

export const authOptions = {
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Check if email matches admin email
          if (!ADMIN_CREDENTIALS.email || !ADMIN_CREDENTIALS.password || credentials.email !== ADMIN_CREDENTIALS.email) {
            return null;
          }

          // In production, you should hash the password and compare with bcrypt
          // For now, we'll do a simple comparison
          // const isValidPassword = await bcrypt.compare(credentials.password, ADMIN_CREDENTIALS.password);
          const isValidPassword =
            credentials.password === ADMIN_CREDENTIALS.password;

          if (!isValidPassword) {
            return null;
          }

          // Return user object
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
    },
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
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
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
