import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        pin: { label: "PIN", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.pin) {
          return null;
        }

        // TODO: Reemplazar con llamada a BD en API route
        // Por ahora, aceptar cualquier PIN de 4 dígitos
        if (/^\d{4}$/.test(credentials.pin)) {
          return {
            id: "1",
            name: "Usuario Café",
            email: `user@cafeteriabrenda.local`,
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
} as any);
