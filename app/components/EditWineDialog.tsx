'use client'

import React from 'react';
import WineDialogBase from './WineDialogBase';
import { Wine } from '../types/wine';

type EditWineDialogProps = {
  wine: Wine,
  categories: string[],
} 

export default function EditWineDialog({wine, categories}: EditWineDialogProps) {

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
      defaultWineState={wine}
      categories={categories}
      onSubmit={handleSubmit}
    />
  )
}
