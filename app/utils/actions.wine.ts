'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ObjectId } from "mongodb";
import client from "../../services/mongodb";
import { 
  CreateWineSchema, 
  UpdateWineSchema, 
  UpdateQuantitySchema 
} from './schema';

const db = client.db(process.env.MONGODB_DATABASE);

export async function createNewWine(formData: FormData) {
    const wineData = CreateWineSchema.parse(Object.fromEntries(formData.entries()))
    const wine = {
        ...wineData,
        Ready: { open: wineData['Ready-open'], close: wineData['Ready-close'] }
    }
    delete wine['Ready-open']
    delete wine['Ready-close']

    await db.collection("wines").insertOne(wine);

    revalidatePath('/dashboard/current_inventory');
    redirect('/dashboard/current_inventory');
}

export async function updateWine(formData: FormData) {
    const wineData = UpdateWineSchema.parse(Object.fromEntries(formData.entries()))
    const _id = new ObjectId(wineData.ID);
    const page = wineData.page;
    
    const wine = {
        ...wineData,
        Ready: { open: wineData['Ready-open'], close: wineData['Ready-close'] }
    }
    delete wine['Ready-open']
    delete wine['Ready-close']
    delete wine.ID
    delete wine.page

    await db.collection("wines").replaceOne({_id}, {
        ...wine,
        _id
    });

    if (wine.Archived) revalidatePath(`/dashboard/archived`)
    if (wine.GetMore) revalidatePath(`/dashboard/get_more`)
    revalidatePath(`/dashboard/${page}`);
    redirect(`/dashboard/${page}`);
}

export async function updateQuantity(formData: FormData) {
    const { ID, Quantity, page } = UpdateQuantitySchema.parse({
        ID: formData.get('ID'),
        Quantity: formData.get('Quantity'),
        page: formData.get('page')
    })
    const _id = new ObjectId(ID);
    
    await db.collection("wines").updateOne(
        {_id}, 
        { $set: { Quantity }}
    );

    revalidatePath(`/dashboard/${page}`);
    redirect(`/dashboard/${page}`);
}

export async function deleteWine(ID: string, page: string) {
    const _id = new ObjectId(ID)
    await db.collection("wines").deleteOne({_id})

    revalidatePath(`/dashboard/${page}`);
    redirect(`/dashboard/${page}`);
}