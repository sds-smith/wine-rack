
import PrintableTable from '../components/PrintableTable';
import { getWines } from '../utils/getWines';

export default async function Print() {
  const { columns, chunkedWineList, metaData: { totalBottles } } = await getWines();

  return (
    <PrintableTable 
      columns={columns}
      chunkedWineList={chunkedWineList}
      totalBottles={totalBottles}
    />
  );
}
