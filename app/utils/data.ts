import client from "../../services/mongodb";
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
        .map((w) => ({ ...w, ID: w._id, ...(w.Price && {Price: w.Price.toFixed(2)}) }))
        .sort((a, b) => parseInt(a.Category || '') - parseInt(b.Category || '') || parseInt(a.Vintage || '') - parseInt(b.Vintage || ''));
    const metaData = wineList.reduce(
        (acc: Metadata, curr: Wine) => ({
            totalBottles: Number(acc.totalBottles) + Number(curr.Quantity || 0)
        }), initialMetaData
    )
    return { wineList, metaData}
}