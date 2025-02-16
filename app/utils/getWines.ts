import client from "../../services/mongodb";
import chunk from "./chunkArray";
import { Wine, Metadata, initialMetaData } from "../types/wine";
import { importFromExcel } from './importFromExcel'

const db = client.db("wine_rack");

const getWineData = async () => {
    try {
        const data = await db.collection("wines").find({ Archived: { $ne: true } }).toArray();
        return Response.json({
            status: 200,
            success: true,
            wineData: data,
            message: 'Success!'
        })
    } catch (e) {
        console.error(e);
        return Response.json({
            status: 400,
            success: false,
            wineData: [],
            message: `Error: ${e}`
        })
    }
}

async function loadWines() {
    const response = await getWineData();
    const { wineData } = await response.json();

    if (!wineData.length) {
        try {
            const wines = await importFromExcel();
            const insertResponse = await db.collection("wines").insertMany(wines);
            if (!insertResponse) return []
            return await getWineData();
        } catch(err) {
            console.error(err)
            return []
        }
    }
    return wineData.map((w: { _id: any; }) => ({ ...w, ID: w._id}))
}

export async function getWines() {
    const wineData: Wine[] = await loadWines();

    const wineList = wineData
        .sort((a: Wine, b: Wine) => parseInt(a.Category) - parseInt(b.Category) || parseInt(a.Vintage || '') - parseInt(b.Vintage || ''));
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

    return { 
        wineList, 
        columns, 
        metaData, 
        categories, 
        chunkedWineList 
    };
};