import React from "react";
import SignupPage from "@/src/components/templates/signupPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
async function page() {
  const data = await getServerSession(authOptions);
  if (data) redirect("/");
  return <SignupPage />;
}

export default page;
