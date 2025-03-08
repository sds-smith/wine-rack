import { Suspense } from 'react';
import LoginForm from '../components/forms/LoginForm';
 
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