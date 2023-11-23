import { NextResponse } from "next/server";
import Connect from "@/src/utils/connectDB";
import User from "@/src/models/User";
import { HashedPassword } from "@/src/utils/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "لطفا همه ی فیلد ها را پر کنید" },
        { status: 422 }
      );
    }

    await Connect();

    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { error: "کاربر قبلا ثبت نام کرده است" },
        { status: 401 }
      );
    }

    const hashedPassword = await HashedPassword(password);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "ثبت نام با موفقیت انجام شد" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
