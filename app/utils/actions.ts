'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ObjectId } from "mongodb";
import client from "../../services/mongodb";
import { signIn, getUser } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

const db = client.db(process.env.MONGODB_DATABASE);

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  const ChangePasswordSchema = z.object({
    email: z.string(),
    current_password: z.string(),
    retype_password: z.string(),
    new_password: z.string(),
});

  export async function changePassword(
    prevState: string | undefined,
    formData: FormData,
  ) {
    const { email, current_password, new_password, retype_password } = ChangePasswordSchema.parse({
      email: formData.get('email'),
      current_password: formData.get('current_password'),
      retype_password: formData.get('retype_password'),
      new_password: formData.get('new_password'),
    })
    let redirectPath : string | null = null;

    try {
      const user = await getUser(email);
      const hashedPassword = await bcrypt.hash(new_password, 10)
      const currentPasswordMatch = await bcrypt.compare(current_password, user!.password);
      const newPasswordMatch = await bcrypt.compare(retype_password, hashedPassword);
      if (currentPasswordMatch) {
        if (newPasswordMatch) {
          await db.collection("users").updateOne(
            { email }, 
            { $set: { password: hashedPassword, firstLogin: false }}
          );
          revalidatePath('/login/password_changed')
          redirectPath = '/login/password_changed'
        }
      }
    } catch (error) {
      console.log(`[Error]: ${error}`)
      return `Error: ${error}`;
    } finally {
      if (redirectPath) {
        redirect(redirectPath)

      }

    }
  }

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
    page         : z.optional(z.string()),
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


const UpdateQuantitySchema = z.object({
    ID           : z.optional(z.string()),
    page         : z.optional(z.string()),
    Quantity     : z.coerce.number(),
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