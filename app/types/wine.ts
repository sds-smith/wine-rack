

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

export enum Categories {
    "01-W" = "01-W",
    "02-W" = "02-W",
    "03-W" = "03-W",
    "04-W" = "04-W",
    "05-W" = "05-W",
    "06-R" = "06-R",
    "07-R" = "07-R",
    "08-R" = "08-R",
    "09-R" = "09-R",
    "10-R" = "10-R",
    "11-R" = "11-R",
    "12-R" = "12-R",
    "13-R" = "13-R",
    "14-R" = "14-R",
    "15-R" = "15-R",
    "16-R" = "16-R",
    "17-R" = "17-R",
    "18-R" = "18-R",
    "19-R" = "19-R",
    "20-D" = "20-D",
    "25-M" = "25-M",
}

export type Metadata = {
    nextId: number,
    totalBottles: number
}

export const initialMetaData = {
    nextId: 0,
    totalBottles: 0
}