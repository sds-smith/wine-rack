'use client'

import { useMemo } from 'react';
import WineDialogBase from './WineDialogBase';
import { Wine, defaultWineInputState } from '../types/wine';

type EditWineDialogProps = {
  wine: Wine,
  categories: string[],
} 

export default function EditWineDialog({wine, categories}: EditWineDialogProps) {  
  const defaultWineEditState = useMemo(() => Object.entries(wine).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: key === 'Ready' 
      ? value 
      : Boolean(value) || key === 'Notes'
      ? `${value}`
      : ''
  }), defaultWineInputState), [wine])

  const handleSubmit = async (wineState: Wine) => {
    const resp = await fetch(`/api`, {
      method: 'PUT',
      body: JSON.stringify(wineState)
    });
    return await resp.json();
  }

  return (
    <WineDialogBase
      mode='EDIT'
      defaultWineInputState={defaultWineEditState}
      categories={categories}
      onSubmit={handleSubmit}
    />
  )
}
