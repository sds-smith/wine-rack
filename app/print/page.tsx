

import PrintableTable from '../components/PrintableTable';
import { useWines, Wine } from '../hooks/useWines';

export default async function Print() {
  const { chunkedWineList, columns, metaData: {totalBottles} } = await useWines();
  const columnHeadings = columns.filter(h => ![ 'ID', 'Category' ].includes(h));

  return (
    <PrintableTable
      chunkedWineList={chunkedWineList}
      columnHeadings={columnHeadings}
      totalBottles={totalBottles}
    />
  );
}
