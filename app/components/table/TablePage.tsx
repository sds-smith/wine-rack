
import WineTable from "./WineTable";
import styles from "../../page.module.css";

type TablePageProps = {
  page: string,
  searchParams?: { 
    filter_by_category?: string 
    order?: string 
    orderBy?: string 
    
  }, 
  title: string,
}

export default function TablePage({page, searchParams, title} : TablePageProps) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 style={{marginBottom: '16px'}}>{title}</h3>
        <WineTable page={page}/>
      </main>
    </div>
  )
}
