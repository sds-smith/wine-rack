
import EditWineDialog from "@/app/components/dialogs/EditWineDialog";
import WineTable from "../../../components/table/WineTable";
import styles from "../../../page.module.css";
import { getWineByID, getCategories, Page } from "@/app/utils/data";
import { Wine } from "@/app/types/wine";

type EditPageProps = { 
  params: Promise<{ id: string }>, 
  searchParams?: Promise<{ page?: Page }>, 
}

export default async function EditPage(props: EditPageProps) {
  const params = await props.params;
  const id = params.id;
  const searchParams = await props.searchParams;
  const page = searchParams?.page || 'current_inventory';
  const wine: Wine = await getWineByID(id); 
  const { categories } = await getCategories();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 style={{marginBottom: '16px'}}>Current Inventory</h3>
        <EditWineDialog categories={categories} wine={wine} page={page} />
        <WineTable page={page}/>
      </main>
    </div>
  );
}
