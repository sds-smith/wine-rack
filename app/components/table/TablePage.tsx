
// import WineTable from "./WineTable";
import styles from "../../page.module.css";

type TablePageProps = {
  page: string,
  searchParams?: { 
    filter_by_category?: string 
    order?: string 
    orderBy?: string 
    
  }, 
}

export default function TablePage({page, searchParams} : TablePageProps) {
  const { filter_by_category, order, orderBy } = searchParams || {}
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>{page}</div>
        <div>{`filter_by_category ${filter_by_category}`}</div>
        <div>{`order ${order}`}</div>
        <div>{`orderBy ${orderBy}`}</div>
        {/* <WineTable page={page} searchParams={searchParams}/> */}
      </main>
    </div>
  )
}
