'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { changePassword } from '@/app/utils/actions.user';
 
export default function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [ errorMessage, formAction, isPending ] = useActionState( changePassword, undefined );
 
  return (
    <form action={formAction} >
      <Container style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-evenly', alignItems: 'center'}} >
        <h1 >
          Please Change your Password.
        </h1>
        <h3 >
          Password must be 6 or more characters in length.
        </h3>
        <h3 >
          It may include any combination of alpha/numeric/special characters.
        </h3>
        <Box >
          <TextField
            fullWidth
            variant="standard"
            id="email"
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email address"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            variant="standard"
            id="current_password"
            type="password"
            name="current_password"
            label="Current Password"
            placeholder="Enter current password"
            margin="normal"
            required
            slotProps={{htmlInput: {minLength: 6}}}
          />
          <TextField
            fullWidth
            variant="filled"
            id="new_password"
            type="password"
            name="new_password"
            label="New Password"
            placeholder="Enter new password"
            margin="normal"
            required
            slotProps={{htmlInput: {minLength: 6}}}
          />
          <TextField
            fullWidth
            variant="filled"
            id="retype_password"
            type="password"
            name="retype_password"
            label="Re-type New Password"
            placeholder="Enter new password"
            margin="normal"
            required
            slotProps={{htmlInput: {minLength: 6}}}
          />
        </Box>
        <Input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button type='submit' aria-disabled={isPending}>
          Submit 
        </Button> 
        <Box
          aria-live="polite"
          aria-atomic="true"
        >
          { errorMessage && <p >{errorMessage}</p> }
        </Box>
      </Container>
    </form>
  );
}