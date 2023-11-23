"use client";

import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";

function Header(props) {
  const { data } = useSession();

  return (
    <header className={styles.header}>
      <div>
        <ul>
          <Link href="/">
            <li>صفحه اصلی</li>
          </Link>
          <Link href="/buy-residential">
            <li>آگهی ها</li>
          </Link>
        </ul>
      </div>
      <div className={styles.login}>
        {data ? (
          <Link href="/dashboard">
            <FaUserAlt />
          </Link>
        ) : (
          <Link href="/signin">
            <FiLogIn />
            <span>ورود</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
