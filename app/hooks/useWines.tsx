
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

export async function useWines() {
    const data = await fetch('http://localhost:3000/api');
    const wineData = await data.json();
    const wineList = wineData.sort((a: Wine, b: Wine) => parseInt(a.Category) - parseInt(b.Category))

    const categories = [...new Set(wineList.map(({Category}: Wine) => Category))] as string[]
    const nextId = wineList.reduce((acc: number, curr: Wine) => Math.max(acc, curr.ID), 0) + 1

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

    return { wineList, columns, nextId, categories };
};