import DashboardPage from "@/src/components/templates/DashboardPage";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import User from "@/src/models/User";
import Connect from "@/src/utils/connectDB";

export const metadata = {
  title: "پنل کاربری",
  description: "پنل کاربری",
};

async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");
  console.log(session);
  await Connect();
  const user = await User.findOne({ email: session.user.email });
  if (user.rule == "ADMIN")
    return (
      <DashboardPage email={user.email} rule={user.rule}>
        {children}
      </DashboardPage>
    );
  return <DashboardPage>{children}</DashboardPage>;
}

export default DashboardLayout;
