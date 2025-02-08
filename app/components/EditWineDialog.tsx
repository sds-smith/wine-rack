'use client'

import React from 'react';
import WineDialogBase from './WineDialogBase';
import { Wine } from '../hooks/useWines';

type EditWineDialogProps = {
  wine: Wine,
  categories: string[],
} 

export default function EditWineDialog({wine, categories}: EditWineDialogProps) {

  const handleSubmit = async (wineState: Wine) => {
    const resp = await fetch(`/api`, {
      method: 'PATCH',
      body: JSON.stringify(wineState)
    });
    return await resp.json();
  }

  return (
    <WineDialogBase
      mode='EDIT'
      defaultWineState={wine}
      categories={categories}
      onSubmit={handleSubmit}
    />
  )
}
