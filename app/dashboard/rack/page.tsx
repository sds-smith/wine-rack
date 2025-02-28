
import WineTable from "../../components/table/WineTable";
import styles from "../../page.module.css";

export default async function Rack() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 style={{marginBottom: '16px'}}>Current Inventory</h3>
        <WineTable/>
      </main>
    </div>
  );
}
