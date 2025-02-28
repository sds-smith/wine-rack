'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ObjectId } from "mongodb";
import client from "../../services/mongodb";

const db = client.db(process.env.MONGODB_DATABASE);

const CreateWineSchema = z.object({
    Category     : z.string(),
    Varietal     : z.optional(z.string()),
    Country      : z.optional(z.string()),
    Vintage      : z.optional(z.string()),
    Producer     : z.string(),
    Label        : z.optional(z.string()),
    Appellation  : z.optional(z.string()),
    'Ready-open' : z.optional(z.string()),
    'Ready-close': z.optional(z.string()),
    Source       : z.optional(z.string()),
    Price        : z.optional(z.coerce.number()),
    Acquired     : z.optional(z.string()),
    Notes        : z.coerce.boolean(),
    Quantity     : z.coerce.number(),
    Comments     : z.optional(z.string()),
});

const UpdateWineSchema = z.object({
    ID           : z.optional(z.string()),
    Category     : z.string(),
    Varietal     : z.optional(z.string()),
    Country      : z.optional(z.string()),
    Vintage      : z.optional(z.string()),
    Producer     : z.string(),
    Label        : z.optional(z.string()),
    Appellation  : z.optional(z.string()),
    'Ready-open' : z.optional(z.string()),
    'Ready-close': z.optional(z.string()),
    Source       : z.optional(z.string()),
    Price        : z.optional(z.coerce.number()),
    Acquired     : z.optional(z.string()),
    Notes        : z.coerce.boolean(),
    Quantity     : z.coerce.number(),
    Comments     : z.optional(z.string()),
    Archived     : z.optional(z.coerce.boolean()),
    GetMore      : z.optional(z.coerce.boolean()),
});

export async function createNewWine(formData: FormData) {
    const wineData = CreateWineSchema.parse(Object.fromEntries(formData.entries()))
    const wine = {
        ...wineData,
        Ready: { open: wineData['Ready-open'], close: wineData['Ready-close'] }
    }
    delete wine['Ready-open']
    delete wine['Ready-close']

    await db.collection("wines").insertOne(wine);

    revalidatePath('/dashboard/rack');
    redirect('/dashboard/rack');
}

export async function updateWine(formData: FormData) {
    const wineData = UpdateWineSchema.parse(Object.fromEntries(formData.entries()))
    const _id = new ObjectId(wineData.ID);
    
    const wine = {
        ...wineData,
        Ready: { open: wineData['Ready-open'], close: wineData['Ready-close'] }
    }
    delete wine['Ready-open']
    delete wine['Ready-close']
    delete wine.ID

    await db.collection("wines").replaceOne({_id}, {
        ...wine,
        _id
    });

    revalidatePath('/dashboard/rack');
    redirect('/dashboard/rack');
}

