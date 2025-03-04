'use client';

import Button from '@mui/material/Button';
import { useActionState } from 'react';
import { authenticate } from '@/app/utils/actions';
import { useSearchParams } from 'next/navigation';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 
  return (
    <form action={formAction} >
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-evenly', alignItems: 'center'}} >
        <h1 >
          Please log in to continue.
        </h1>
        <div >
          <div>
            <label
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
            >
              Password
            </label>
            <div >
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button type='submit' aria-disabled={isPending}>
          Log in 
        </Button> 
        <div
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p >{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}