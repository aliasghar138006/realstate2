import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Connect from "@/src/utils/connectDB";
import User from "@/src/models/User";
import { VerifyPassword } from "@/src/utils/auth";

export const authOptions = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      async authorize(credential) {
        const { email, password } = credential;
        if (!email || !password) {
          throw new Error("لطفا فیلدها را پر کنید");
          return;
        }

        await Connect();

        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("کاربر یافت نشد");
          return;
        }

        const verifyPass = await VerifyPassword(password, user.password);

        if (!verifyPass) {
          throw new Error("ایمیل یا پسورد اشتباه است");
          return;
        }

        return { email };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
