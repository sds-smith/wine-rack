'use client'

import React from 'react';
import WineInputDialog from './WineInputDialog';
import { Wine } from '../hooks/useWines';

type EditWineDialogProps = {
  wine: Wine,
  categories: string[],
} 

export default function EditWineDialog({wine, categories}: EditWineDialogProps) {
    const defaultWineState = wine;

    const handleSubmit = async (wineState: Wine) => {
        // const resp = await fetch('http://localhost:3000/api', {
        //     method: 'POST',
        //     body: JSON.stringify(wineState)
        // });
        // const responsey = await resp.json();
        console.log({wineState})
    }

    return (
      <WineInputDialog
        mode='EDIT'
        defaultWineState={defaultWineState}
        categories={categories}
        onSubmit={handleSubmit}
      />
    )
}
