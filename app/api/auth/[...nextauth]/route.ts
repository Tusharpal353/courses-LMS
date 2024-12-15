/* import dbConnect from "@/lib/db";
import User from "@/models/users/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        Email: { label: "email", type: "text", placeholder: "Enter email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials: any) {
        const email = credentials.Email;
        const password = credentials.password;
        await dbConnect();
        const user = await User.findOne({ email: email, password: password });

        if (!user) {
          return null;
        }

        return {
          email:user.email,
        };
      },
    }),
  ],
  pages:{
        signIn:"/signin"
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
 */
import dbConnect from "@/lib/db";
import User from "@/models/users/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        Email: { label: "email", type: "text", placeholder: "Enter email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials) {
          return null; // Return null if credentials are undefined
        }

        const email = credentials.Email;
        const password = credentials.password;
        await dbConnect();

        // Find the user by email
        const user = await User.findOne({ email: email });

        // Check if user exists and password matches
        if (!user || user.password !== password) {
          return null; // Return null if user not found or password doesn't match
        }

        // Return the user object with required properties
        return {
          id: user._id, // Assuming _id is the identifier in your User model
          email: user.email,
          // Add any other properties you need
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };