import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/src/models/user.models";
import bcrypt from "bcrypt";
import connectDatabase from "@/src/config/mongodbConnection";
import { NextAuthOptions, TokenSet } from "next-auth";
import { UserType } from "@/utils/interface/interface";

enum Role {
  Admin = "admin",
  User = "user",
}

declare module "next-auth" {
  interface User {
    role: Role;
    id: string;
    email: string;
    image: string;
    avatar: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      email: string;
      name: string;
      password: string;
      image: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name: string;
    image: string;
    role: Role;
    email: string;
  }
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_Secret!,
      profile: async (profile: GoogleProfile, tokens: TokenSet) => {
        console.log("Profile Google: ", profile);

        const { email } = profile;

        await connectDatabase();

        let userExist = await User.findOne({ email: email });

        console.log("exist email user ", userExist);

        if (!userExist) {
          await connectDatabase();

          const splitted = profile.email.split("@");

          let _user = await User.create({
            fullname: profile.name,
            email: profile.email,
            avatar: profile.picture,
            password: profile.at_hash,
            username: splitted[0],
          });

          userExist = _user;
        }

        return {
          ...profile,
          name: userExist.fullname,
          id: userExist._id,
          role: userExist.role,
          image: userExist.avatar,
          avatar: userExist.avatar,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials: { email: string; password: string }) {
        try {
          if (!credentials) {
            return Promise.reject(new Error("filed email and passwrod"));
          }
          const { email, password } = credentials;

          await connectDatabase();

          const foundUser: UserType = await User.findOne({ email: email });

          if (!foundUser) {
            return Promise.reject(new Error("Invalid Email"));
          }

          if (foundUser) {
            const match = await bcrypt.compare(password, foundUser.password);

            if (!match) {
              return Promise.reject("password invalid");
            }

            const user = {
              email: foundUser.email,
              id: foundUser._id,
              name: foundUser.fullname,
              image: foundUser.avatar,
            };

            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // const role = "role" in user ? user.role : "user";
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // const role =
        //   "role" in token ? (token.role as Role) : ("defaultRole" as Role);
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },
};
