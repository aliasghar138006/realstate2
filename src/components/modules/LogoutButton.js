"use client";

import React from "react";
import { FiLogOut } from "react-icons/fi";
import styles from "./LogoutButton.module.css";
import { signOut } from "next-auth/react";

function LogoutButton(props) {
  return (
    <button className={styles.button} onClick={signOut}>
      <FiLogOut />
      خروج
    </button>
  );
}

export default LogoutButton;
