
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
    Acquired: Date;
    Notes: string;
    Quantity: number;
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

    const categories = [...new Set(wineList.map(({Category}: Wine) => Category))]
    const ids = wineList.map(({ID}: Wine) => ID).sort((a: number, b: number) => a-b)
    const nextId = wineList.reduce((acc: number, curr: Wine) => Math.max(acc, curr.ID), 0) + 1
    console.log({nextId})

    const columns = {
        A: 'ID',
        B: "Category",
        C: "Varietal",
        D: "Country",
        E: "Vintage",
        F: "Producer",
        G: "Label",
        H: "Appellation",
        I: "Ready",
        J: "Source",
        K: "Price",
        L: "Acquired",
        M: "Notes",
        N: "Quantity",
        O: "Comments",
    }

    return { wineList, columns, nextId, categories };
};