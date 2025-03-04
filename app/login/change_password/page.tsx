import ChangePasswordForm from '../../components/forms/ChangePasswordForm';
import { Suspense } from 'react';
 
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