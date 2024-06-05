import { db } from "@/db/db-connection";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  // session: { strategy: "database" },
  // adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ request }: any) {
        let user: User = {};
        user.email = "test@test.com";
        user.id = "123456";
        user.name = "test";
        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      //session.user.role = token.role ? (token.role as string[]) : undefined;
      // Send properties to the client, like an access_token from a provider.
      // if (session.user) {

      return {
        ...session,
        user: {
          ...session.user,
          role: "test@test.com" ? "admin" : "user",
        },
      };
    },
    authorized({ request, auth }) {
      // console.log("🚀 ~ authorized ~ request, auth:", request, auth);
      // const headersList = headers();
      // const referer = headersList.get("authorization");

      // const serverkey = referer == (process.env.NEXTAUTH_SECRET as string);

      // if (!(serverkey || !!auth?.user)) {
      // if (!auth?.user) {
      //   return NextResponse.redirect(
      //     `${process.env.BASE_URL}login?callbackUrl=${encodeURI(
      //       request.nextUrl.pathname,
      //     )}`,
      //   );
      // }

      return !!auth?.user; // this ensures there is a logged in user for -every- request
    },
  },
});

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}
