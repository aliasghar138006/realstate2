"use client";
import styles from "@/modules/AdminCard.module.css";
import { sp } from "@/src/utils/number";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function AdminCard({ data: { _id, title, description, price, location } }) {
  const router = useRouter();
  const publishHandler = async () => {
    const res = await fetch(`/api/admin/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (result.status == 200) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  const deleteHandler = async () => {
    const res = await fetch(`/api/profile/${_id}`, { method: "DELETE" });
    const result = await res.json();
    if (result.status == 200) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.properties}>
        <span>{location}</span>
        <span>{sp(price)}</span>
      </div>
      <button onClick={publishHandler}>انتشار</button>
      <Link
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "5px",
          borderRadius: "7px",
          marginRight: "5px",
        }}
        href={`/buy-residential/${_id}`}
      >
        جزئیات آگهی
      </Link>
      <button
        style={{ backgroundColor: "red", marginRight: "7px" }}
        onClick={deleteHandler}
      >
        حذف آگهی
      </button>
      <Toaster />
    </div>
  );
}

export default AdminCard;
