import AdminPage from "@/src/components/templates/AdminPage";

import Profile from "@/src/models/Profile";
import Connect from "@/src/utils/connectDB";

export const metadata = {
  title: "ادمین",
};

async function Admin() {
  await Connect();
  const profiles = await Profile.find({ published: false });

  return <AdminPage data={profiles} />;
}

export default Admin;
