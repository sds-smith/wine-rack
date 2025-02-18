'use client'

import { createContext, useState, useEffect, ReactNode, FC, Dispatch, SetStateAction } from "react";
import { Wine, initialMetaData, Metadata } from "../types/wine";

const buildWinesByID = (wineList: Wine[]): WinesByID => wineList?.reduce((acc, curr) =>({
  ...acc,
  [`${curr.ID}`] : curr
}), {}) || {}

export type WinesByID = {
  [key: string] : Wine
}

export type OptimisticFormContextProps = {
  winesByID: WinesByID,
  setWinesByID: Dispatch<SetStateAction<WinesByID>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  metaData: Metadata,
  resetWinesByID: () => void
}

export type ProviderProps = {
  wineList: Wine[],
  children?: ReactNode
}
  
export const OptimisticFormContext = createContext<OptimisticFormContextProps>({
  winesByID: {},
  setWinesByID: () => {},
  loading: false,
  setLoading: () => {},
  metaData: initialMetaData,
  resetWinesByID: () => {}
})
  
export const OptimisticFormProvider: FC<ProviderProps> = ({wineList, children}) => {
  const [ winesByID, setWinesByID ] = useState(buildWinesByID(wineList));
  const [ loading, setLoading ] = useState(false)

  const metaData: Metadata = Object.values(winesByID).reduce(
    (acc: Metadata, curr: Wine) => ({
      totalBottles: Number(acc.totalBottles) + Number(curr.Quantity || 0)
    }), initialMetaData
  )

  const resetWinesByID = () => setWinesByID(buildWinesByID(wineList))

  useEffect(() => {
    setWinesByID(buildWinesByID(wineList))
    setLoading(false)
  }, [wineList])

  const value = { winesByID, setWinesByID, loading, setLoading, metaData, resetWinesByID }

  return <OptimisticFormContext.Provider value={value} >{children}</OptimisticFormContext.Provider>
}