import styles from "@/modules/Sidebar.module.css";
import Link from "next/link";
import { HiFilter } from "react-icons/hi";

function Sidebar(props) {
  const categories = [
    { villa: "ویلا" },
    { appartment: "آپارتمان" },
    { store: "مغازه" },
    { office: "اداره" },
  ];
  return (
    <div className={styles.container}>
      <p>
        <HiFilter />
        دسته بندی
      </p>
      <Link href="/buy-residential">همه</Link>
      {categories.map((i) => (
        <Link
          key={Object.keys(i)}
          href={{
            pathname: "/buy-residential",
            query: { category: Object.keys(i) },
          }}
        >
          {Object.values(i)}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
