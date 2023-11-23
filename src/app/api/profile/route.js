import Profile from "@/src/models/Profile";
import User from "@/src/models/User";
import Connect from "@/src/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await Connect();
    const {
      title,
      description,
      phone,
      location,
      price,
      realState,
      category,
      constructionDate,
      amenities,
      rules,
    } = await req.json();
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json({ message: "ابتدا وارد شوید" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { message: "کاربر وجود ندارد" },
        { status: 404 }
      );
    }
    if (
      !title ||
      !location ||
      !description ||
      !phone ||
      !realState ||
      !price ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { message: "اطلاعات را کامل وارد کنید" },
        { status: 400 }
      );
    }
    const newProfile = await Profile.create({
      title,
      description,
      category,
      amenities,
      rules,
      realState,
      constructionDate,
      phone,
      location,
      price: +price,
      userId: new Types.ObjectId(user._id),
    });
    console.log(newProfile);
    return NextResponse.json({ message: "آگهی ثبت شد", status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "server error!!" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await Connect();
    const session = await getServerSession(req);
    const {
      _id,
      title,
      description,
      realState,
      category,
      phone,
      price,
      location,
      rules,
      amenities,
      constructionDate,
    } = await req.json();

    if (
      !_id ||
      !title ||
      !location ||
      !description ||
      !phone ||
      !realState ||
      !price ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { message: "اطلاعات را کامل وارد کنید" },
        { status: 400 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری شوید" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { message: "کاربر وجود ندارد" },
        { status: 404 }
      );
    }

    const profile = await Profile.findOne({ _id });

    if (!user._id.equals(profile.userId)) {
      return NextResponse.json({ message: "عدم دسترسی" }, { status: 400 });
    }

    profile.title = title;
    profile.description = description;
    profile.category = category;
    profile.phone = phone;
    profile.price = price;
    profile.location = location;
    profile.rules = rules;
    profile.amenities = amenities;
    profile.constructionDate = constructionDate;
    profile.realState = realState;
    profile.save();
    return NextResponse.json(
      { message: "آگهی با موفقیت ویرایش شد", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error!!" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await Connect();
    const profiles = await Profile.find({ published: true }).select("-userId");

    return NextResponse.json({ message: "Ok", status: 200, data: profiles });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error!", status: 500 });
  }
}
