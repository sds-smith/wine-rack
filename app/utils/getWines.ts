import chunk from "./chunkArray";
import { Wine, Categories, Metadata, initialMetaData } from "../types/wine";

export async function getWines() {
    const data = await fetch(`${process.env.BASE_URL}/api`);
    const wineData = await data.json();
    const wineList = wineData.sort((a: Wine, b: Wine) => parseInt(a.Category) - parseInt(b.Category) || parseInt(a.Vintage) - parseInt(b.Vintage));
    const chunkedWineList = chunk(wineList, 40)

    const categories = Categories;

    const metaData = wineList.reduce(
        (acc: Metadata, curr: Wine) => ({
            totalBottles: Number(acc.totalBottles) + Number(curr.Quantity || 0)
        }), initialMetaData
    )

    const columns = [
        "Category",
        "Varietal",
        "Country",
        "Vintage",
        "Producer",
        "Label",
        "Appellation",
        "Ready",
        "Source",
        "Price",
        "Acquired",
        "Notes",
        "Quantity",
        "Comments",
    ]

    return { wineList, columns, metaData, categories, chunkedWineList };
};