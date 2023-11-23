import styles from "@/templates/AdminPage.module.css";
import AdminCard from "../modules/AdminCard";

function AdminPage({ data }) {
  return (
    <div>
      {!data.length ? (
        <p className={styles.text}>هیچ آگهی در انتظار تاییدی وجود ندارد</p>
      ) : null}
      {data.map((i) => (
        <AdminCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default AdminPage;
