'use client'

import React from 'react';
import WineDialogBase from './WineDialogBase';
import { Wine, defaultWineInputState } from '../types/wine';

type AddWineDialogProps = {
  categories: string[],
} 

export default function AddWineDialog({categories}: AddWineDialogProps) {

  const handleSubmit = async (wineState: Wine) => {
    const resp = await fetch(`/api`, {
      method: 'POST',
      body: JSON.stringify(wineState)
    });
    return await resp.json();
  }

  return (
    <WineDialogBase
      defaultWineInputState={defaultWineInputState}
      categories={categories}
      onSubmit={handleSubmit}
    />
  )
}
