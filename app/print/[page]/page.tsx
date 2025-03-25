
import { Suspense } from 'react';
import PrintableTable from '../../components/table/PrintableTable';
import { 
  getWineData, 
  getCategories, 
  columns
} from '@/app/utils/data';

type PrintPageProps = { 
  params: Promise<{ page: string }>, 
}

export default async function Print(props: PrintPageProps) {
  const params = await props.params;
  const page = params.page;
  const { chunkedWineList, metaData: { totalBottles } } = await getWineData(page);
  const { categoriesByCode } = await getCategories();

  return (
    <Suspense>
      <PrintableTable 
        columns={columns}
        chunkedWineList={chunkedWineList}
        totalBottles={totalBottles}
        page={page}
        categoriesByCode={categoriesByCode}
      />
    </Suspense>
  );
}
