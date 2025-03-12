
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import BasicInventoryChart from '../components/charts/BasicInventoryChart';
import { sorted_wines } from '../utils/data.sorted_wines';
import { auth, checkFirstLogin } from '@/auth';
import styles from "../page.module.css";

export default async function Dashboard() {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = await checkFirstLogin(email!);

  if (firstLogin) return redirect('/login/change_password')
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 >Dashboard</h3>
        <Container  sx={{display: 'flex', flexWrap: 'wrap', marginTop:'60px'}}>
          { Object.entries(sorted_wines).map(([key, list]) => (
            <BasicInventoryChart key={key} sortedWineList={list} title={`Current Inventory by ${key}`} />
          ))}
        </Container>
      </main>
    </div>
  );
}
