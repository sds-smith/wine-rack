import { ObjectId } from "mongodb";
import client from "../../services/mongodb";
import chunk from "./chunkArray";
import { Wine, Metadata, initialMetaData, Category, CategoriesByCode } from "../types/wine";

const db = client.db(process.env.MONGODB_DATABASE);

export async function getWineData(page: string) {
    const filter = {
        current_inventory: { Archived: { $ne: true } },
        archived: { Archived: true },
        get_more: { GetMore: true }
    }
    const data = await db.collection("wines").find(filter[page as keyof typeof filter]).toArray();
    const wineList: Wine[] = data
        .map((w) => ({ ...w, ID: w._id.toString(), _id: w._id.toString(), ...(w.Price && {Price: w.Price.toFixed(2)}) }))
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

export async function getCategories() {
    const data = await db.collection("categories").find({}).toArray();
    const categoryData = data.map(({_id, code, title, group}):Category => ({ ID: _id.toString(), code, title, group }))
    
    const categories: Category[] = categoryData.sort((a,b)=>parseInt(a.code)-parseInt(b.code))

    const categoriesByCode: CategoriesByCode = categories.reduce((acc, curr) => ({
        ...acc,
        [curr.code] : curr
    }), {})

    return { categories, categoriesByCode }
}

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
