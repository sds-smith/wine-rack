'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { authenticate } from '@/app/utils/actions.user';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [ errorMessage, formAction, isPending ] = useActionState( authenticate, undefined );
 
  return (
    <form action={formAction} >
      <Container style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-evenly', alignItems: 'center'}} >
        <h1 >
          Please Log In to Continue.
        </h1>
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
            id="password"
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password"
            margin="normal"
            required
            slotProps={{htmlInput: {minLength: 6}}}
          />
        </Box>
        <Input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button type='submit' aria-disabled={isPending}>
          Log in 
        </Button> 
        <Box
          aria-live="polite"
          aria-atomic="true"
        >
          { errorMessage && <p >{'errorMessage'}</p> }
        </Box>
      </Container>
    </form>
  );
}