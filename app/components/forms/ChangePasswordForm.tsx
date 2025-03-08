'use client';

import Button from '@mui/material/Button';
import { useActionState } from 'react';
import { changePassword } from '@/app/utils/actions.user';
import { useSearchParams } from 'next/navigation';
 
export default function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [ errorMessage, formAction, isPending ] = useActionState( changePassword, undefined );
 
  return (
    <form action={formAction} >
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-evenly', alignItems: 'center'}} >
        <h1 >
          Please Change your Password.
        </h1>
        <h2 >
          Password must be 6 or more characters in length. It may include any combination of alpha/numeric/special characters.
        </h2>
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
              htmlFor="current_password"
            >
              Current Password
            </label>
            <div >
              <input
                id="current_password"
                type="password"
                name="current_password"
                placeholder="Enter current password"
                required
                minLength={6}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="new_password"
            >
              New Password
            </label>
            <div >
              <input
                id="new_password"
                type="password"
                name="new_password"
                placeholder="Enter new password"
                required
                minLength={6}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="retype_password"
            >
              Re-type New Password
            </label>
            <div >
              <input
                id="retype_password"
                type="password"
                name="retype_password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button type='submit' aria-disabled={isPending}>
          Submit 
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