"use client";
import styles from "@/templates/ProfileDetailsPage.module.css";
import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { RiHome3Line } from "react-icons/ri";
import { MdApartment } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { GiOfficeChair } from "react-icons/gi";
import { Toaster, toast } from "react-hot-toast";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import { e2p, sp } from "@/utils/number";
import Title from "../modules/Title";
import Itemlist from "../modules/Itemlist";
import ShareButton from "../modules/ShareButton";
import { useRouter } from "next/navigation";

function ProfileDetailsPage({
  rule = "USER",
  data: {
    _id,
    title,
    location,
    description,
    amenities,
    rules,
    realState,
    phone,
    category,
    price,
    constructionDate,
    published,
  },
}) {
  const router = useRouter();
  const categories = {
    apartment: "آپارتمان",
    villa: "ویلا",
    store: "مغازه",
    office: "دفتر",
  };
  const icons = {
    villa: <RiHome3Line />,
    apartment: <MdApartment />,
    store: <BiStore />,
    office: <GiOfficeChair />,
  };
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
      router.push("/dashboard/admin");
    } else {
      toast.error(result.message);
    }
  };

  const deleteHandler = async () => {
    const res = await fetch(`/api/profile/${_id}`, { method: "DELETE" });
    const result = await res.json();
    if (result.status == 200) {
      toast.success(result.message);
      router.push("/dashboard/admin");
    } else {
      toast.error(result.error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{title}</h1>
        <span>
          <HiOutlineLocationMarker />
          {location}
        </span>
        <Title>توضیحات</Title>
        <p>{description}</p>
        <Title>امکانات رفاهی</Title>
        <Itemlist data={amenities} />
        <Title>قوانین</Title>
        <Itemlist data={rules} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <SiHomebridge />
          <p>املاک {realState}</p>
          <span>
            <AiOutlinePhone />
            {e2p(phone)}
          </span>
        </div>
        <ShareButton />
        <div className={styles.price}>
          <p>
            {icons[category]}

            {categories[category]}
          </p>
          <p>{sp(price)}تومان</p>
          <p>
            <BiCalendarCheck />
            {new Date(constructionDate).toLocaleDateString("fa-IR")}
          </p>
        </div>
        {rule == "USER" ? null : (
          <div className={styles.button}>
            {published ? null : (
              <button onClick={publishHandler}>انتشار</button>
            )}
            <button onClick={deleteHandler}>حذف</button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default ProfileDetailsPage;
