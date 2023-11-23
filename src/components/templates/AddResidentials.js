"use client";

import React, { useEffect, useState } from "react";
import styles from "./AddResidentials.module.css";
import TextInput from "../modules/TextInput";
import RadioList from "../modules/RadioList";
import TextList from "../modules/TextList";
import CustomDatePicker from "../modules/CustomDatePicker";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

function AddResidentials({ data }) {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    realState: "",
    price: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
  });
  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, []);
  const submitHandler = async () => {
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();
    setLoading(false);
    if (data.status == 201) {
      toast.success("آگهی ثبت شد");
    } else {
      toast.error(data.message);
    }
  };
  const editHandler = async () => {
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();
    setLoading(false);
    if (data.status === 200) {
      toast.success("آگهی ویرایش شد");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className={styles.container}>
      <h3>{data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>
      <TextInput
        name="title"
        title="عنوان آگهی"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        name="description"
        title="توضیحات"
        profileData={profileData}
        setProfileData={setProfileData}
        textArea={true}
      />
      <TextInput
        title="آدرس"
        name="location"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="شماره تماس"
        name="phone"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="قیمت(تومان)"
        name="price"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="بنگاه"
        name="realState"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <RadioList profileData={profileData} setProfileData={setProfileData} />
      <TextList
        title="امکانات رفاهی"
        profileData={profileData}
        setProfileData={setProfileData}
        type="amenities"
      />
      <TextList
        title="قوانین"
        profileData={profileData}
        setProfileData={setProfileData}
        type="rules"
      />

      <CustomDatePicker
        profileData={profileData}
        setProfileData={setProfileData}
      />

      {loading ? (
        <ThreeDots
          color="#304ffe"
          height={45}
          ariaLabel="three-dots-loading"
          visible={true}
          wrapperStyle={{ margin: "auto" }}
        />
      ) : data ? (
        <button className={styles.submit} onClick={editHandler}>
          ویرابش آگهی
        </button>
      ) : (
        <button className={styles.submit} onClick={submitHandler}>
          ثبت آگهی
        </button>
      )}
      <Toaster />
    </div>
  );
}

export default AddResidentials;
