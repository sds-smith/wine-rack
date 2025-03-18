
import WineTable from "./WineTable";
import WineTableByVarietal from "./WineTableByVarietal";
import WineTableByRow from "./WineTableByRow";
import styles from "../../page.module.css";

type TablePageProps = {
  page: string,
  searchParams?: { 
    filter_by_category?: string 
    order?: string 
    orderBy?: string 
    
  }, 
  title: string,
  table?: string
}

export default function TablePage({page, searchParams, table='default'} : TablePageProps) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        { table==='default' && <WineTable 
          page={page} 
          searchParams={searchParams}
        />}
        { table==='byVarietal' && <WineTableByVarietal page={page} />}
        { table==='byRow' && <WineTableByRow page={page} />}
      </main>
    </div>
  )
}
