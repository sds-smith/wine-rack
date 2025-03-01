
import PrintableTable from '../../components/table/PrintableTable';
import { getWineData, columns } from '../../utils/data';

type PrintPageProps = { 
  params: Promise<{ page: string }>, 
}

export default async function Print(props: PrintPageProps) {
  const params = await props.params;
  const page = params.page;
  const { chunkedWineList, metaData: { totalBottles } } = await getWineData(page);

  return (
    <PrintableTable 
      columns={columns}
      chunkedWineList={chunkedWineList}
      totalBottles={totalBottles}
      page={page}
    />
  );
}
