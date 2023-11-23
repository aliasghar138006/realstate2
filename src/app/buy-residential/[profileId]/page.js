import ProfileDetailsPage from "@/src/components/templates/ProfileDetailsPage";
import Connect from "@/src/utils/connectDB";
import User from "@/src/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Profile from "@/src/models/Profile";

async function ProfileDetails({ params: { profileId } }) {
  await Connect();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  const user = await User.findOne({ email: session.user.email });
  if (!user) redirect("/");
  const res = await fetch(
    `https://realstate-jn49zd595-aliasghar138006.vercel.app/api/profile/${profileId}`
  );
  const result = await res.json();
  if (!result.data) return <h3>صفحه مورد نظر یافت نشد</h3>;
  if (user.rule == "ADMIN")
    return <ProfileDetailsPage data={result.data} rule="ADMIN" />;
  return <ProfileDetailsPage data={result.data} />;
}

export default ProfileDetails;

export async function generateMetadata({ params: { profileId } }) {
  await Connect();
  const profile = await Profile.findOne({ _id: profileId });
  return {
    title: profile.title,
    description: profile.description,
    authors: { name: profile.realState },
    keywords: { name: "keywords", content: "meta data" },
  };
}
