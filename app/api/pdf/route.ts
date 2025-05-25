import { getWineData, getCategories, columns } from "../../utils/data";

export async function GET(request: Request) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search);
  const page = searchParams.get("page");

  const { wineList } = await getWineData(page || 'current_inventory')
  const { categoriesByCode } = await getCategories()
  columns[columns.indexOf('Quantity')] = 'Qty'

  return Response.json({
    wineList,
    columnHeadings: columns.slice(1),
    categoriesByCode
  })
}