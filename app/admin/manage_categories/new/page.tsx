
import CategoriesTable from '../../../components/admin/CategoriesTable';
import AddCategoryForm from '@/app/components/admin/AddCategoryForm';

export default async function NewCategoryPage() {
  return (
    <>
      <CategoriesTable disabled={true} />
      <AddCategoryForm />
    </>
  );
}
