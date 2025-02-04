
import WineTable from "./components/WineTable";
import styles from "./page.module.css";
import { testDatabaseConnection } from "./actions";

export default async function Home() {
  const isConnected = await testDatabaseConnection();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Paul and Brenda's Wine Rack</h1>
        { isConnected
          ? <h2 style={{color: 'green'}}>CONNECTED TO MONGODB</h2>
          : <h2 style={{color: 'red'}}>not connected</h2>
        }
        <WineTable/>
      </main>
    </div>
  );
}
