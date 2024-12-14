import dbConnect from "@/lib/db";
import User from "@/models/users/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";

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
