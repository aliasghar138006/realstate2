import React from "react";
import styles from "./DashboardPage.module.css";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import LogoutButton from "../modules/LogoutButton";

async function DashboardPage({ children, email, rule }) {
  console.log(email, rule);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CgProfile />
        {rule == "ADMIN" ? "Admin" : null}
        <p>{email}</p>
        <Link href="/dashboard">حساب کاربری</Link>
        <Link href="/dashboard/my-profiles">آگهی های من</Link>
        <Link href="/dashboard/add">ثبت آگهی</Link>
        {rule == "ADMIN" ? (
          <Link href="/dashboard/admin">در انتظار تایید</Link>
        ) : null}
        <LogoutButton />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default DashboardPage;
