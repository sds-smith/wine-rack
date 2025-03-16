
import TablePage from "@/app/components/table/TablePage";

type PageProps = { 
  searchParams?: Promise<{ 
    filter_by_category?: string 
    order?: string 
    orderBy?: string 
    
  }>, 
}

export default async function Rack(props: PageProps) {
  const searchParams = await props.searchParams;
  const filter_by_category = searchParams?.filter_by_category || '';
  const order = searchParams?.order || '';
  const orderBy = searchParams?.orderBy || '';

  return (
    <TablePage 
      page='get_more'
      searchParams={{filter_by_category, order, orderBy}}
    />
  );
}
