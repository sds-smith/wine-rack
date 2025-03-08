import { Suspense } from 'react';
import ChangePasswordForm from '../../components/forms/ChangePasswordForm';
 
export default function ChangePassword() {
  return (
    <main >
      <div >
        <Suspense>
          <ChangePasswordForm />
        </Suspense>
      </div>
    </main>
  );
}