import React from "react";
import styles from "./DashboardProfile.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import User from "@/src/models/User";

async function DashboardProfile(props) {
  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session.user.email });

  return (
    <div className={styles.container}>
      <h3>سلام 👋</h3>
      <p>آگهی های خود را ثبت کنید تا هزاران نفر آن را مشاهده کنند</p>
      <div className={styles.createdAt}>
        <p>تاریخ عضویت:</p>
        <span>{new Date(user.createdAt).toLocaleDateString("fa-IR")}</span>
      </div>
    </div>
  );
}

export default DashboardProfile;
