import { ObjectId } from "mongodb";
import client from "../../services/mongodb";
import chunk from "./chunkArray";
import { Wine, Metadata, initialMetaData } from "../types/wine";

const db = client.db(process.env.MONGODB_DATABASE);

export async function getWineData(page: string) {
    const filter = {
        rack: { Archived: { $ne: true } },
        archived: { Archived: true },
        get_more: { GetMore: true }
    }
    const data = await db.collection("wines").find(filter[page as keyof typeof filter]).toArray();
    const wineList: Wine[] = data
        .map((w) => ({ ...w, ID: w._id.toString(), ...(w.Price && {Price: w.Price.toFixed(2)}) }))
        .sort((a, b) => parseInt(a.Category || '') - parseInt(b.Category || '') || parseInt(a.Vintage || '') - parseInt(b.Vintage || ''));

    const metaData = wineList.reduce(
        (acc: Metadata, curr: Wine) => ({
            totalBottles: Number(acc.totalBottles) + Number(curr.Quantity || 0)
        }), initialMetaData
    );

    const chunkedWineList = chunk(wineList, 40)

    return { wineList, metaData, chunkedWineList }
}

export async function getWineByID(ID: string) {
    const _id = new ObjectId(ID);
    const wineArray = await db.collection("wines").find({ _id }).toArray()
    const wine = wineArray.find(wine => wine) as Wine
    return { ...wine, ID }
}

export const categories: string[] = [
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

export const columns = [
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