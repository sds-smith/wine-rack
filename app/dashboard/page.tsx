
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import BasicInventoryChart from '../components/charts/BasicInventoryChart';
import { sorted_wines } from '../utils/data.sorted_wines';
import { auth, checkFirstLogin } from '@/auth';
import styles from "../page.module.css";

export default async function Dashboard() {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = (await checkFirstLogin(email!))?.firstLogin;

  if (firstLogin) return redirect('/login/change_password')
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 >Dashboard</h3>
        <Container  sx={{display: 'flex', flexWrap: 'wrap', marginTop:'60px'}}>
          <BasicInventoryChart sortedWineList={sorted_wines.Group}    title='Current Inventory by Group' />
          <BasicInventoryChart sortedWineList={sorted_wines.Category} title='Current Inventory by Category' />
          <BasicInventoryChart sortedWineList={sorted_wines.Vintage}  title='Current Inventory by Vintage' />
          <BasicInventoryChart sortedWineList={sorted_wines.Ready}    title='Current Inventory by Ready' />
        </Container>
      </main>
    </div>
  );
}
