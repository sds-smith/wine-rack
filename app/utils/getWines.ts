import chunk from "./chunkArray";
import { Wine, Metadata, initialMetaData } from "../types/wine";

export async function getWines() {
    const data = await fetch(`${process.env.BASE_URL}/api`);
    const wineData = await data.json();
    const wineList = wineData.sort((a: Wine, b: Wine) => parseInt(a.Category) - parseInt(b.Category) || parseInt(a.Vintage || '') - parseInt(b.Vintage || ''));
    const chunkedWineList = chunk(wineList, 40)

    const categories: string[] = [
        "01-W",
        "02-W",
        "03-W",
        "04-W",
        "05-W",
        "06-R",
        "07-R",
        "08-R",
        "09-R",
        "10-R",
        "11-R",
        "12-R",
        "13-R",
        "14-R",
        "15-R",
        "16-R",
        "17-R",
        "18-R",
        "19-R",
        "20-D",
        "25-M",
    ];

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