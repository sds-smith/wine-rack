
// import XLSX from 'xlsx';

export type Wine = {
    ID: Number;
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
    Quantity: Number;
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

export type Rows = { [key: string]: Wine }

export const columns = {
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

export async function useWines() {
    const data = await fetch('http://localhost:3000/api')
    const wineList = await data.json()

    // const wineList: Wine[] = [];
    // const promiseArray: any[] = [];

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

    // const { Sheet1 } = workbook.Sheets;
    // const rows: Rows = Object.entries(Sheet1).reduce((acc, [cell, data]) => {
    //     const cellCol = cell.slice(0, 1);
    //     const cellRow = cell.slice(1);
    //     if (cellRow === '2') return acc;
    //     return {
    //         ...acc,
    //        [cellRow] : {
    //             ...acc[cellRow],
    //             [columns[cellCol as keyof Columns]]: data.v
    //         } 
    //     }
    // }, {} as Rows)

    // const postWine = (wine: Wine) => {
    //     console.log({wine})
    //     fetch("http://localhost:3000/api", {
    //         method: "POST",
    //         body: JSON.stringify(wine),
    //     })
    //     .then(res => res.json().then(wine => console.log('[mongo]',{wine})))
    // }
    // Object.values(rows).forEach((row) => {
    //     if (row.Country) {
    //         wineList.push(row)
    //         promiseArray.push(postWine(row))
    //     }
    //     return
    // })

    // Promise.allSettled(promiseArray).then(()=>console.log('YO FAM'))

    return { wineList, columns };
};