
export type Ready = {
    open: string;
    close: string;
}

export type Wine = {
    Category: string;
    Varietal: string;
    Country: string;
    Vintage: string;
    Producer: string;
    Label: string;
    Appellation: string;
    Ready: Ready;
    Source: string;
    Price: number | null;
    Acquired: string;
    Notes: boolean | null;
    Quantity: number;
    Comments: string;
};

export type WineInput = {
    Category: string;
    Varietal: string;
    Country: string;
    Vintage: string;
    Producer: string;
    Label: string;
    Appellation: string;
    Ready: Ready;
    Source: string;
    Price: string;
    Acquired: string;
    Notes: string;
    Quantity: string;
    Comments: string;
};

export const defaultWineState: Wine = {
    Category: '',
    Varietal: '',
    Country: '',
    Vintage: '',
    Producer: '',
    Label: '',
    Appellation: '',
    Ready: {open: '', close: ''},
    Source: '',
    Price: 0,
    Acquired: '',
    Notes: false,
    Quantity: 0,
    Comments: '',
};

export const defaultWineInputState: WineInput = {
    Category: '',
    Varietal: '',
    Country: '',
    Vintage: '',
    Producer: '',
    Label: '',
    Appellation: '',
    Ready: {open: '', close: ''},
    Source: '',
    Price: '',
    Acquired: '',
    Notes: '',
    Quantity: '',
    Comments: '',
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