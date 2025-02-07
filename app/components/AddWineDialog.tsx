'use client'

import React from 'react';
import WineInputDialog from './WineInputDialog';
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
        const resp = await fetch('http://localhost:3000/api', {
            method: 'POST',
            body: JSON.stringify(wineState)
        });
        const responsey = await resp.json();
        console.log({responsey})
    }

    return (
      <WineInputDialog
        mode='ADD'
        defaultWineState={defaultWineState}
        categories={categories}
        onSubmit={handleSubmit}
      />
    )
}
