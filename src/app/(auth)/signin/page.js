import SigninPage from "@/src/components/templates/signinPage";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function route(props) {
  const data = await getServerSession(authOptions);
  if (data) redirect("/");
  return <SigninPage />;
}

export default route;
