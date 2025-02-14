'use client'

import React from 'react';
import WineDialogBase from './WineDialogBase';
import { Wine, Categories } from '../types/wine';

type AddWineDialogProps = {
  categories: typeof Categories,
} 

export default function AddWineDialog({categories}: AddWineDialogProps) {
  const defaultWineState: Wine = {
    Category: '',
    Varietal: '',
    Country: '',
    Vintage: '',
    Producer: '',
    Label: '',
    Appellation: '',
    Ready: {open: '', close: ''},
    Source: '',
    Price: null,
    Acquired: '',
    Notes: null,
    Quantity: 0,
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
