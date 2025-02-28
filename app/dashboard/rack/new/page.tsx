
import AddWineDialog from "@/app/components/AddWineDialog";
import WineTable from "../../../components/WineTable";
import styles from "../../../page.module.css";
import { getWines } from "@/app/utils/getWines";

export default async function Rack() {
  const { categories } = await getWines();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Paul and Brenda's Wine Rack</h1>
        <AddWineDialog categories={categories} />
        <WineTable/>
      </main>
    </div>
  );
}
