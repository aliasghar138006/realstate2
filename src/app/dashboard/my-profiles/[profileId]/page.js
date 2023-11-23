import AddResidentials from "@/src/components/templates/AddResidentials";
import Profile from "@/src/models/Profile";
import Connect from "@/src/utils/connectDB";
import React from "react";

async function EditProfile({ params: { profileId } }) {
  await Connect();
  const profile = await Profile.findOne({ _id: profileId });

  return <AddResidentials data={JSON.parse(JSON.stringify(profile))} />;
}

export default EditProfile;
