
import EditWineDialog from "@/app/components/dialogs/EditWineDialog";
import WineTable from "../../../components/table/WineTable";
import styles from "../../../page.module.css";
import { getWines } from "@/app/utils/getWines";

export default async function Rack(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { categories, wineList } = await getWines();
  const wine = wineList.find(wine => wine.ID === id);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 style={{marginBottom: '16px'}}>Current Inventory</h3>
        <EditWineDialog categories={categories} wine={wine!} />
        <WineTable/>
      </main>
    </div>
  );
}
