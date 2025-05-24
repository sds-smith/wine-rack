import { getWineData, columns } from "../../utils/data";

export async function GET(request: Request) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search);
  const page = searchParams.get("page");
  console.log({page})

  const { wineList } = await getWineData(page || 'current_inventory')

  return Response.json({
    wineList,
    columnHeadings: columns.slice(1)
  })
}