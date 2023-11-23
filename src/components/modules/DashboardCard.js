"use client";
import styles from "@/modules/DashboardCard.module.css";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function DashboardCard({ children, data }) {
  const router = useRouter();
  const editHandler = () => {
    router.push(`/dashboard/my-profiles/${data._id}`);
  };
  const deleteHandler = async () => {
    const res = await fetch(`/api/profile/${data._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status == 200) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };
  return (
    <div className={styles.container}>
      <div>{children}</div>
      <div className={styles.main}>
        <button onClick={editHandler}>ویرابش آگهی</button>
        <button onClick={deleteHandler}>حذف آگهی</button>
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardCard;
