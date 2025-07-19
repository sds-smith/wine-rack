import type { WithId, Document } from 'mongodb'

export interface Category {
    ID: string,
    code: string,
    title: string,
    group: string,
    color?: string
}

export interface CategoriesByCode {
    [key: string] : Category
}

export interface Ready {
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

export type WineField = string | number | boolean | Ready | null | undefined;

export interface Metadata {
    totalBottles: number
}

export const initialMetaData = {
    totalBottles: 0
}

export type Column = "Category" | "Varietal" | "Country" | "Vintage" | "Producer" | "Label" 
    | "Appellation" | "Ready" | "Source" | "Price" | "Acquired" | "Notes" | "Quantity" | "Comments" | "Qty"