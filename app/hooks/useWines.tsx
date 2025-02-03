
import XLSX from 'xlsx';

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

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTIEicrz8-4AV2o7dq4N77K5CDugM_5EQNLZu3kUg_AuYi4cFXQ3OKfdai3dQx6qg/pubhtml';
const file = await (await fetch(url)).arrayBuffer();
const workbook = XLSX.read(file);

export function useWines() {
    const wineList: Wine[] = [];

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

    const { Sheet1 } = workbook.Sheets;
    const rows: Rows = Object.entries(Sheet1).reduce((acc, [cell, data]) => {
        const cellCol = cell.slice(0, 1);
        const cellRow = cell.slice(1);
        if (cellRow === '2') return acc;
        return {
            ...acc,
           [cellRow] : {
                ...acc[cellRow],
                [columns[cellCol as keyof Columns]]: data.v
            } 
        }
    }, {} as Rows)
    console.log({rows})
    Object.values(rows).forEach((row) => {
        if (row.Country) wineList.push(row)
        return
    })
console.log({wineList})

    return { wineList, columns };
};