
import WineTable from "../../components/WineTable";
import styles from "../../page.module.css";

export default async function Rack() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <h1>Paul and Brenda's Wine Rack</h1> */}
        <WineTable/>
      </main>
    </div>
  );
}
