"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./signupPage.module.css";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";

function SigninPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signinHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("ورود با موفقیت انجام شد");
      router.push("/");
    }
  };
  return (
    <div className={styles.form}>
      <h4>صفحه ورود</h4>
      <form>
        <label>ایمیل</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>رمز عبور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!loading ? (
          <button onClick={(e) => signinHandler(e)}>ورود</button>
        ) : (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ margin: "auto" }}
            wrapperClassName=""
            visible={true}
          />
        )}
      </form>
      <p>
        حساب کاربری ندارید؟
        <Link href="/signup">ثبت نام</Link>
      </p>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default SigninPage;
