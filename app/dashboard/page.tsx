
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import { auth } from "@/auth"
import { checkFirstLogin } from '@/auth';
import BasicInventoryChart from '../components/graphs/BasicInventoryChart';
import { getWineData, categoriesByCode } from '../utils/data';
import styles from "../page.module.css";
import { Category } from '../types/wine';

export default async function Dashboard() {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = (await checkFirstLogin(email!))?.firstLogin;

  const { wineList } = await getWineData('rack');
  
  const winesByCategory = wineList.reduce((acc, curr) => ({
    ...acc,
    [curr.Category] : (acc[curr.Category as keyof typeof acc] || 0) + curr.Quantity
  }), {})

  const winesByVintage = wineList.reduce((acc, curr) => ({
    ...acc,
    [`${curr.Vintage || 'NV'}`] : (acc[curr.Vintage as keyof typeof acc] || 0) + curr.Quantity
  }), {})

  const winesByReady = wineList.reduce((acc, curr) => ({
    ...acc,
    [`${curr.Ready.open}`] : (acc[curr.Ready.open as keyof typeof acc] || 0) + curr.Quantity
  }), {})

  const winesByGroup = wineList.reduce((acc, curr) => {
    const currKey = curr.Category;
    const groupKey = (categoriesByCode[currKey as keyof typeof categoriesByCode] as Category)?.group
    return {
    ...acc,
    ...( groupKey && {[groupKey as keyof typeof acc] : (acc[groupKey as keyof typeof acc] || 0) + curr.Quantity})
  }}, {})

  if (firstLogin) return redirect('/login/change_password')
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 >Dashboard</h3>
        <Container  sx={{display: 'flex', flexWrap: 'wrap', marginTop:'60px'}}>
          <BasicInventoryChart sortedWineList={winesByGroup} title='Current Inventory by Group' />
          <BasicInventoryChart sortedWineList={winesByCategory} title='Current Inventory by Category' />
          <BasicInventoryChart sortedWineList={winesByVintage} title='Current Inventory by Vintage' />
          <BasicInventoryChart sortedWineList={winesByReady} title='Current Inventory by Ready' />
        </Container>
      </main>
    </div>
  );
}
