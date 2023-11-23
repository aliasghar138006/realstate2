import Profile from "@/src/models/Profile";
import User from "@/src/models/User";
import Connect from "@/src/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params: { profileId } }) {
  try {
    await Connect();
    const session = await getServerSession(req);

    if (!session)
      return NextResponse.json({ message: "UnAuthorise", status: 401 });
    const user = await User.findOne({ email: session.user.email });
    if (!user)
      return NextResponse.json({ message: "User dos not exist!", status: 404 });
    if (user.rule !== "ADMIN")
      return NextResponse.json({ message: "Forbidden!", status: 403 });

    const profile = await Profile.findOne({ _id: profileId });
    profile.published = true;
    profile.save();
    return NextResponse.json({ message: "آگهی منتشر شد", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "server error!", status: 500 });
  }
}
