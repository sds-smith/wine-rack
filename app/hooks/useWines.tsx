import chunk from "../utils/chunkArray";

export type Wine = {
    ID: number;
    Category: string;
    Varietal: string;
    Country: string;
    Vintage: string;
    Producer: string;
    Label: string;
    Appellation: string;
    Ready: string;
    Source: string;
    Price: string;
    Acquired: Date | string;
    Notes: string;
    Quantity: number | string;
    Comments: string;
};

export type Columns = {
    A: string,
    B: string,
    C: string,
    D: string,
    E: string,
    F: string,
    G: string,
    H: string,
    I: string,
    J: string,
    K: string,
    L: string,
    M: string,
    N: string,
    O: string,
}

type Metadata = {
    nextId: number,
    totalBottles: number
}

const initialMetaData = {
    nextId: 0,
    totalBottles: 0
}

export async function useWines() {
    const data = await fetch(`${process.env.BASE_URL}/api`);
    const wineData = await data.json();
    const wineList = wineData.sort((a: Wine, b: Wine) => parseInt(a.Category) - parseInt(b.Category) || parseInt(a.Vintage) - parseInt(b.Vintage));
    const chunkedWineList = chunk(wineList, 40)

    const categories = [...new Set(wineList.map(({Category}: Wine) => Category))] as string[]

    const metaData = wineList.reduce(
        (acc: Metadata, curr: Wine) => ({
            nextId: Math.max(acc.nextId, curr.ID) + 1, 
            totalBottles: Number(acc.totalBottles) + Number(curr.Quantity || 0)
        }), initialMetaData
    )

    const columns = [
        'ID',
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