
import WineTable from "./WineTable";
import WineTableByVarietal from "./WineTableByVarietal";
import WineTableByRow from "./WineTableByRow";
import styles from "../../page.module.css";

type TablePageProps = {
  page: string,
  title: string,
  table?: string
}

export default function TablePage({page, title, table='default'} : TablePageProps) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 style={{marginBottom: '16px'}}>{title}</h3>
        { table==='default' && <WineTable page={page}/>}
        { table==='byVarietal' && <WineTableByVarietal page={page}/>}
        { table==='byRow' && <WineTableByRow page={page}/>}
      </main>
    </div>
  )
}
