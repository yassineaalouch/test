import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb';
import mongooseConnect from '@/lib/mongoose';
import User from '@/models/User';
export default NextAuth({
    session: {
      strategy: "jwt",
    },
    providers: [
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {},
        async authorize(credentials) {
          await mongooseConnect();
          const user = await User.findOne({ email: credentials.email });
  
          if (!user) {
            // Create a new user
            const newUser = new User({ email: credentials.email, password: credentials.password });
            await newUser.save();
            return { id: newUser._id, email: newUser.email };
          }
  
          const isValidPassword = user.password === credentials.password;
          if (isValidPassword) {
            return { id: user._id, email: user.email };

          } else {
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: '/auth/LoginForm',
    },
    callbacks: {
      jwt(params) {
        // update token
        if (params.user?.role) {
          params.token.role = params.user.role;
        }
        // return final_token
        return params.token;
      },
    },
    adapter: MongoDBAdapter(clientPromise),
  });