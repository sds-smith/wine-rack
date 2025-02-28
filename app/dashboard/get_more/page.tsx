
import WineTable from "../../components/WineTable";
import styles from "../../page.module.css";

export default async function Rack() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 style={{marginBottom: '16px'}}>Get More</h3>
        <WineTable/>
      </main>
    </div>
  );
}
