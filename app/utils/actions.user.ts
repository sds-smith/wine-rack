'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import client from "../../services/mongodb";
import { signIn, getUser } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { ChangePasswordSchema } from './schema';

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