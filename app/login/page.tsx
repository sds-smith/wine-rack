import LoginForm from '../components/forms/LoginForm';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main >
      <div >
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}