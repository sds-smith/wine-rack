

import PrintableTable from '../components/PrintableTable';
import { getWines } from '../utils/getWines';

export default async function Print() {
  const { chunkedWineList, columns, metaData: {totalBottles} } = await getWines();
  const columnHeadings = columns.filter(h => ![ 'ID', 'Category' ].includes(h));

  return (
    <PrintableTable
      chunkedWineList={chunkedWineList}
      columnHeadings={columnHeadings}
      totalBottles={totalBottles}
    />
  );
}
