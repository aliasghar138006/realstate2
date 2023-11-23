import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import User from "@/src/models/User";
import { getServerSession } from "next-auth";
import styles from "@/templates/ProfilesPage.module.css";
import DashboardCard from "../modules/DashboardCard";
import Card from "../modules/Card";

async function ProfilesPage(props) {
  const session = await getServerSession(authOptions);
  console.log(session);
  const [user] = await User.aggregate([
    { $match: { email: session.user.email } },
    {
      $lookup: {
        from: "profiles",
        foreignField: "userId",
        localField: "_id",
        as: "profiles",
      },
    },
  ]);

  const { profiles } = user;

  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}> هیچ آگهی ثبت نشده است</p>
      )}

      {profiles.map((i) => (
        <DashboardCard key={i._id} data={JSON.parse(JSON.stringify(i))}>
          <Card data={i} />
        </DashboardCard>
      ))}
    </div>
  );
}

export default ProfilesPage;
