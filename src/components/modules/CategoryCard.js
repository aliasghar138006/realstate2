import Link from "next/link";
import styles from "./CategoryCard.module.css";
import Image from "next/image";

function CategoryCard({ name, title }) {
  return (
    <div className={styles.card}>
      <Link href={`/buy-residential?categoty=${name}`}>
        <Image
          src={`/images/${name}.png`}
          alt={title}
          width={240}
          height={144}
          periority={true}
        />
        <p>{title}</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
