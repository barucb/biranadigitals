import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession } from "next-auth";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      redirectUri: 'https://yourdomain.com/api/auth/callback/google',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      try {
        console.log("Original token:", token);
    
        if (user) {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
    
          if (dbUser && dbUser.role !== undefined) {
            token.role = dbUser.role;
          }
        }
    
        console.log("Modified token:", token);
        return token;
      } catch (error) {
        console.error("Error in async jwt callback:", error);
        throw error; // Propagate the error
      }
    },
    
    async session(session, token) {
      try {
        // Ensure session is defined and user is populated before assigning role
        if (session && session.user) {
          session.user.role = token?.role || "USER";
        }      
        return session;
      } catch (error) {
        console.error("Error in async session callback:", error);
        throw error; // Propagate the error
      }
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
