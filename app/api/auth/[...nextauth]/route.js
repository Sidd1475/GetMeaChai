import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import mongoose from 'mongoose'
import { User } from '@/models/user';
import { Payment } from '@/models/payment'
import Username from '@/app/[username]/page'
import connectDB from '@/db/connectDb';

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
     
  ],

 callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "github") {
          await connectDB();

          const currentUser = await User.findOne({ email: user.email });

          if (!currentUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split('@')[0],
            });
            await newUser.save();
            user.name = newUser.username;
          }

          return true;
        }

        return false;
      } catch (err) {
        console.error("SignIn Error:", err);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectDB();

        const dbUser = await User.findOne({ email: session.user.email });
        console.log(dbUser)
        if (dbUser) {
          session.user.name = dbUser.username;
        }

        return session;
      } catch (err) {
        console.error("Session Error:", err);
        return session;
      }
    },
  },

})

export {handler as GET , handler as POST}