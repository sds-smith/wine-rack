import React from 'react'
import { getWineByID } from '@/app/utils/data';

type ViewWineProps = {
  params: Promise<{ id: string }>,
}

export default async function ViewWine(props: ViewWineProps) {
  const params = await props.params;
  const id = params.id;
  const wine = await getWineByID(id);
  console.log({wine})

  return (
    <>
      <div>{`Category: ${wine.Category}`}</div>
      <div>{`Varietal: ${wine.Varietal}`}</div>
      <div>{`Country: ${wine.Country}`}</div>
      <div>{`Vintage: ${wine.Vintage}`}</div>
      <div>{`Producer: ${wine.Producer}`}</div>
      <div>{`Label: ${wine.Label}`}</div>
      <div>{`Appellation: ${wine.Appellation}`}</div>
      <div>{`Ready: ${wine.Ready.open} - ${wine.Ready.close}`}</div>
      <div>{`Source: ${wine.Source}`}</div>
      <div>{`Price: ${wine.Price}`}</div>
      <div>{`Acquired: ${wine.Acquired}`}</div>
      <div>{`Quantity: ${wine.Quantity}`}</div>
      <div>{`Comments: ${wine.Comments}`}</div>
    </>
  )
}
