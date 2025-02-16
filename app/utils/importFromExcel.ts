
import XLSX from 'xlsx';
import { Wine, defaultWineState, Ready } from '../types/wine';

type RawData = {
    A: string,
    B: string,
    C: string,
    D: number,
    E: string,
    F: string,
    G: string,
    H: string,
    I: string
    J: number,
    K: string,
    L: string,
    M: number,
    N: string
}

type Column = {
    heading: string;
    convert: ((value: string) => string) | ((value: number) => number) | ((value: string) => Ready) | ((value: string) => boolean)
}
type Columns = {
    A: Column,
    B: Column,
    C: Column,
    D: Column,
    E: Column,
    F: Column,
    G: Column,
    H: Column,
    I: Column
    J: Column,
    K: Column,
    L: Column,
    M: Column,
    N: Column
}

export async function importFromExcel() {
    const url = "https://docs.google.com/spreadsheets/d/1RQ3LxmN14ulIhLdy3R6ddqvOj3Prlvv2/edit?usp=sharing&ouid=113315703908196041103&rtpof=true&sd=true";
    const file = await (await fetch(url)).arrayBuffer();
    const workbook = XLSX.read(file);

    const { Sheet1 } = workbook.Sheets;

    const raw_data: RawData[] = XLSX.utils.sheet_to_json(Sheet1);

    const columns: Columns = {
        A: {heading: "Category",    convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        B: {heading: "Varietal",    convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        C: {heading: "Country",     convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        D: {heading: "Vintage",     convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        E: {heading: "Producer",    convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        F: {heading: "Label",       convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        G: {heading: "Appellation", convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        H: {heading: "Ready",       convert: (value:string): Ready => ({open: value.split('-')[0], close: value.split('-')[1]})}, 
        I: {heading: "Source",      convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        J: {heading: "Price",       convert: (value: number): number => value}, 
        K: {heading: "Acquired",    convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
        L: {heading: "Notes",       convert: (value:string): boolean => value === 'x' || value === 'X'}, 
        M: {heading: "Quantity",    convert: (value:number): number => value}, 
        N: {heading: "Comments",    convert: (value:string): string => `${value}`.replaceAll('&#39;', "'")}, 
    }

    const wines: Wine[] = raw_data.map((row:RawData) => {
        return Object.entries(columns).reduce((acc, [key, {heading, convert}]) => ({
            ...acc,
            ...(Boolean(row[key as keyof RawData]) && { [heading as keyof Wine]: convert(row[key as keyof RawData]) })
        }), defaultWineState)
    })
    return wines
}