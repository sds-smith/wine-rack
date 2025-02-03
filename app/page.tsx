
import WineTable from "./components/WineTable";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <WineTable/>
      </main>
    </div>
  );
}
