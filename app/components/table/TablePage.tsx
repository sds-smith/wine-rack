
import WineTable from "./WineTable";
import styles from "../../page.module.css";
import { Page } from "@/app/utils/data";

type TablePageProps = {
  page: Page,
  searchParams?: { 
    filter_by_category?: string 
    order?: string 
    orderBy?: string 
    
  }, 
}

export default function TablePage({page, searchParams} : TablePageProps) {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <WineTable page={page} searchParams={searchParams}/>
      </main>
    </div>
  )
}
