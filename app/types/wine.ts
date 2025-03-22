import type { WithId, Document } from 'mongodb'

export interface Category {
    ID: string,
    code: string,
    title: string,
    group: string,
    color: string
}

export type CategoriesByCode = {
    [key: string] : Category
}

export type Ready = {
    open?    : string;
    close?   : string;
}

export interface Wine extends WithId<Document> {
    ID?         : string;
    Category    : string;
    Varietal?   : string;
    Country?    : string;
    Vintage?    : string;
    Producer    : string;
    Label?      : string;
    Appellation?: string;
    Ready       : Ready;
    Source?     : string;
    Price?      : number;
    Acquired?   : string;
    Notes       : boolean;
    Quantity    : number;
    Comments?   : string;
    Archived?   : boolean;
    GetMore?    : boolean;
};

export type WineInput = {
    ID?         : string;
    Category    : string;
    Varietal?   : string;
    Country?    : string;
    Vintage?    : string;
    Producer    : string;
    Label?      : string;
    Appellation?: string;
    Ready       : Ready;
    Source?     : string;
    Price?      : string;
    Acquired?   : string;
    Notes       : string;
    Quantity    : string;
    Comments?   : string;
    Archived?   : string;
    GetMore?    : string;
};

export type WineField = string | number | boolean | Ready | null | undefined;

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

export type Metadata = {
    totalBottles: number
}

export const initialMetaData = {
    totalBottles: 0
}


export type Column = "Category" | "Varietal" | "Country" | "Vintage" | "Producer" | "Label" 
    | "Appellation" | "Ready" | "Source" | "Price" | "Acquired" | "Notes" | "Quantity" | "Comments" 