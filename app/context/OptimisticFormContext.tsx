'use client'

import { createContext, useState, useEffect, useCallback, ReactNode, FC, Dispatch, SetStateAction } from "react";
import { Wine, WineInput, WineField, initialMetaData, Metadata, defaultWineState } from "../types/wine";

const buildWinesByID = (wineList: Wine[]): WinesByID => wineList?.reduce((acc, curr) =>({
  ...acc,
  [`${curr.ID}`] : curr
}), {}) || {}

const handleType = (name: string, value: WineField) => {
  const stringToBool = {
    true: true,
    false: false
  }
  return ['Notes', 'Archived', 'GetMore'].includes(name) 
    ? stringToBool[value as keyof typeof stringToBool]
    : name === 'Quantity'
    ? Number(value)
    : value;
}

export type WinesByID = {
  [key: string] : Wine
}

export type OptimisticFormContextProps = {
  winesByID: WinesByID,
  setWinesByID: Dispatch<SetStateAction<WinesByID>>,
  loading: boolean,
  metaData: Metadata,
  resetWinesByID: () => void,
  onChangeWine: (wineID: string, category: string, value: string) => void,
  updateQuantity: (value: string, wineID: string) => Promise<any>,
  saveWine: (wine: Wine | WineInput, type?: string) => Promise<any>,
  handleArchive: (wineID: string) => Promise<any>,
  deleteWine: (wine: Wine) => Promise<any>,
}

export type ProviderProps = {
  wineList: Wine[],
  children?: ReactNode
}
  
export const OptimisticFormContext = createContext<OptimisticFormContextProps>({
  winesByID: {},
  loading: false,
  metaData: initialMetaData,
  setWinesByID: () => {},
  resetWinesByID: () => {},
  onChangeWine: () => {},
  saveWine: () => new Promise(() => {}),
  updateQuantity: () => new Promise(() => {}),
  handleArchive: () => new Promise(() => {}),
  deleteWine: () => new Promise(() => {}),
})
  
export const OptimisticFormProvider: FC<ProviderProps> = ({wineList, children}) => {
  const [ winesByID, setWinesByID ] = useState(buildWinesByID(wineList));
  const [ loading, setLoading ] = useState(false)

  const metaData: Metadata = Object.values(winesByID).reduce(
    (acc: Metadata, curr: Wine) => ({
      totalBottles: Number(acc.totalBottles) + Number(curr.Quantity || 0)
    }), initialMetaData
  )

  const resetWinesByID = useCallback(() => setWinesByID(buildWinesByID(wineList)), [wineList])

  const onChangeWine = (wineID: string, columnId: string, value: string) => {
    const newValue = handleType(columnId, value)
    const newWinesByID = (ws: WinesByID) => {
      const wine = ws[wineID]
      const { key, val } = columnId.startsWith('Ready')
        ? {
          key: 'Ready',
          val: {
            ...wine.Ready,
            [columnId.split('-')[1]] : newValue
          }
        }
        : { key: columnId, val: newValue }
      return {
        ...ws,
        [wineID] : {
            ...wine,
            [key]: val
        }
      }
    }
    setWinesByID(ws => newWinesByID(ws))
  }

  const updateQuantity = async (value: string, wineID: string) => {
    setLoading(true)
    const newWinesByID = {
        ...winesByID,
        [wineID] : {
            ...winesByID[wineID],
            Quantity: Number(value)
        }
    }
    setWinesByID(newWinesByID)
    await fetch(`/api`, {
        method: 'PATCH',
        body: JSON.stringify({Quantity: Number(value), wineID})
    });
    setLoading(false);
  }

  const saveWine = async (wine: Wine | WineInput, type='update') => {
    const METHOD = {
      update : "PUT",
      new :"POST"
    }
    const wineToSave = type === 'update'
      ? {
        ...wine,
        Price: Number(wine.Price)

      }
      : Object.entries(wine).reduce((acc, [columnId, value]) => ({
        ...acc,
        [columnId] : handleType(columnId, value),
        Price: Number(wine.Price)
      }), defaultWineState)
    setLoading(true)
    const resp = await fetch(`/api`, {
      method: METHOD[type as keyof typeof METHOD],
      body: JSON.stringify(wineToSave)
    });
    const updateResponse = await resp.json();
    setLoading(false)
    return updateResponse
  }

  const handleArchive = async (wineID: string) => {
    setLoading(true)
    const resp = await fetch(`/api`, {
        method: 'PATCH',
        body: JSON.stringify({Archived: true, wineID})
    });
    const archiveResponse = await resp.json();
    setLoading(false);
    return archiveResponse
  }

  const deleteWine = async (wine: Wine) => {
    setLoading(true)
    const resp = await fetch(`/api`, {
      method: 'DELETE',
      body: JSON.stringify(wine)
    });
    const deleteResponse = await resp.json();
    setLoading(false)
    return deleteResponse
  }

  useEffect(() => {
    resetWinesByID();
    setLoading(false)
  }, [wineList, resetWinesByID])

  const value = { 
    winesByID, 
    setWinesByID, 
    loading, 
    metaData, 
    resetWinesByID, 
    onChangeWine, 
    updateQuantity,
    saveWine, 
    handleArchive,
    deleteWine,
  }

  return <OptimisticFormContext.Provider value={value} >{children}</OptimisticFormContext.Provider>
}