"use client";

import React from "react";
import styles from "@/modules/TextInput.module.css";

function TextInput({
  title,
  profileData,
  setProfileData,
  textArea = false,
  name,
}) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  return (
    <div className={styles.container}>
      <p>{title}</p>
      {textArea ? (
        <textarea
          value={profileData[name]}
          name={name}
          onChange={changeHandler}
        />
      ) : (
        <input
          type="text"
          value={profileData[name]}
          name={name}
          onChange={changeHandler}
        />
      )}
    </div>
  );
}

export default TextInput;
