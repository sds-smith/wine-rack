'use client'

import React from 'react';
import WineDialogBase from './WineDialogBase';
import { Wine } from '../hooks/useWines';

type AddWineDialogProps = {
  ID: number,
  categories: string[],
} 

export default function AddWineDialog({ID, categories}: AddWineDialogProps) {
  const defaultWineState: Wine = {
    ID,
    Category: '',
    Varietal: '',
    Country: '',
    Vintage: '',
    Producer: '',
    Label: '',
    Appellation: '',
    Ready: '',
    Source: '',
    Price: '',
    Acquired: '',
    Notes: '',
    Quantity: '',
    Comments: '',
  }

  const handleSubmit = async (wineState: Wine) => {
    const resp = await fetch(`/api`, {
      method: 'POST',
      body: JSON.stringify(wineState)
    });
    return await resp.json();
  }

  return (
    <WineDialogBase
      mode='ADD'
      defaultWineState={defaultWineState}
      categories={categories}
      onSubmit={handleSubmit}
    />
  )
}
