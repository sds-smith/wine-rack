import { useState, useEffect } from "react";
import chunk from "../utils/chunkArray";
import { Wine, Metadata, initialMetaData } from "../types/wine";

export function useWineData() {
    const [ wineList, setWineList ] = useState([]);
    const [ chunkedWineList, setChunkedWineList ] = useState<Wine[][]>([]);

    useEffect(() => {
        const getWineData = async () => {
            const data = await fetch('/api');
            const { wineData } = await data.json();
            const wineList = (wineData|| []).sort((a: Wine, b: Wine) => parseInt(a.Category) - parseInt(b.Category) || parseInt(a.Vintage || '') - parseInt(b.Vintage || ''));
            const chunkedWineList = chunk(wineList, 40)
            setWineList(wineList);
            setChunkedWineList(chunkedWineList);
        }
        getWineData();
    }, [])

    const metaData = (wineList || []).reduce(
        (acc: Metadata, curr: Wine) => ({
            totalBottles: Number(acc.totalBottles) + Number(curr.Quantity || 0)
        }), initialMetaData
    )

    return { wineList, chunkedWineList, metaData };
};