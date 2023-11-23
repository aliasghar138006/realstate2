"use client";
import { SessionProvider } from "next-auth/react";

function NextProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextProvider;
