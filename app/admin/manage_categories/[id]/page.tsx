
import CategoriesTable from '../../../components/admin/CategoriesTable';
import EditCategoryForm from '@/app/components/admin/EditCategoryForm';

type EditCategoryPageProps = { 
  params: Promise<{ id: string }>, 
}

export default async function EditCategoryPage(props: EditCategoryPageProps) {
  const params = await props.params;
  const id = params.id;

  return (
    <>
      <CategoriesTable disabled={true} editID={id} />
      <EditCategoryForm categoryID={id} />
    </>
  );
    
}
