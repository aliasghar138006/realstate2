import styles from "@/modules/Itemlist.module.css";
function Itemlist({ data }) {
  return (
    <div className={styles.container}>
      {data.length ? (
        <ul>
          {data.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      ) : (
        <p>هیچ موردی ذکر نشده است</p>
      )}
    </div>
  );
}

export default Itemlist;
