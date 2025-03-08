
import AddWineDialog from "@/app/components/dialogs/AddWineDialog";
import WineTable from "../../../components/table/WineTable";
import styles from "../../../page.module.css";
import { getCategories } from "@/app/utils/data";

export default async function Rack() {
  const { categories } = await getCategories();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 style={{marginBottom: '16px'}}>Current Inventory</h3>
        <AddWineDialog categories={categories} />
        <WineTable page='rack'/>
      </main>
    </div>
  );
}
