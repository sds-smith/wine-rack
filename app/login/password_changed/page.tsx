import ChangePasswordForm from '../../components/forms/ChangePasswordForm';
import { Suspense } from 'react';
import PasswordChangedDialog from '../../components/dialogs/PasswordChangedDialog';
 
export default function PasswordChanged() {
  return (
    <main >
      <div >
        <Suspense>
          <ChangePasswordForm />
        </Suspense>
        <PasswordChangedDialog/>
      </div>
    </main>
  );
}