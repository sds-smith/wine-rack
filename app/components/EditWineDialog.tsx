'use client'

import React from 'react';
import WineDialogBase from './WineDialogBase';
import { Wine, Categories, defaultWineInputState } from '../types/wine';

type EditWineDialogProps = {
  wine: Wine,
  categories: typeof Categories,
} 

export default function EditWineDialog({wine, categories}: EditWineDialogProps) {
  const defaultWineEditState = Object.entries(wine).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: key === 'Ready' 
      ? value 
      : Boolean(value) || key === 'Notes'
      ? `${value}`
      : ''
  }), defaultWineInputState)

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
