import Profile from "@/src/models/Profile";
import User from "@/src/models/User";
import Connect from "@/src/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params: { profileId } }) {
  try {
    await Connect();
    const session = await getServerSession(req);
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "user Not Found", status: 404 });
    }
    const profile = await Profile.deleteOne({ _id: profileId });
    console.log(profile);
    return NextResponse.json({ message: "آگهی حذف شد", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "server Error!!", status: 500 });
  }
}

export async function GET(req, { params: { profileId } }) {
  try {
    await Connect();
    const profile = await Profile.findOne({ _id: profileId });

    return NextResponse.json({ message: "OK", status: 200, data: profile });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "server error!", status: 500 });
  }
}
