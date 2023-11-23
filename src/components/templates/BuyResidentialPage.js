import React from "react";
import styles from "@/templates/BuyResidentialPage.module.css";
import Sidebar from "../modules/Sidebar";
import Card from "../modules/Card";

// async function BuyResidentialPage({ searchParams }) {
//   const res = await fetch("http://localhost:3000/api/profile", {
//     cache: "no-store",
//   });
//   const { data } = await res.json();

//   let finalData = data;

//   if (searchParams.category) {
//     finalData = finalData.filter((i) => i.category == searchParams.category);
//   }
//   return (
//     <div className={styles.container}>
//       <div className={styles.sidebar}>
//         <Sidebar />
//       </div>
//       <div className={styles.main}>
//         {!finalData.length ? (
//           <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
//         ) : (
//           finalData.map((i) => <Card key={i._id} data={i} />)
//         )}
//       </div>
//     </div>
//   );
// }

async function BuyResidentialPage() {
  return <h1>Hi</h1>;
}

export default BuyResidentialPage;
