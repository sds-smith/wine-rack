'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ObjectId } from "mongodb";
import client from "../../services/mongodb";
import { CreateCategorySchema, UpdateCategorySchema } from './schema';

const db = client.db(process.env.MONGODB_DATABASE);

export async function createNewCategory(formData: FormData) {
  const categoryData = CreateCategorySchema.parse(Object.fromEntries(formData.entries()))
  const category = {
    ...categoryData,
  }

  await db.collection("categories").insertOne(category);

  revalidatePath('/', 'layout');
  redirect('/admin/manage_categories');
}

export async function updateCategory(formData: FormData) {
  const categoryData = UpdateCategorySchema.parse(Object.fromEntries(formData.entries()))
  const _id = new ObjectId(categoryData.ID);
    
  const category = {
    ...categoryData,
  }
  delete category.ID

  await db.collection("categories").replaceOne({_id}, {
    ...category,
    _id
  });

  revalidatePath('/', 'layout');
  redirect('/admin/manage_categories');
}

export async function deleteCategory(ID: string) {
  const _id = new ObjectId(ID)
  await db.collection("categories").deleteOne({_id})

  revalidatePath('/', 'layout');
  redirect('/admin/manage_categories');
}