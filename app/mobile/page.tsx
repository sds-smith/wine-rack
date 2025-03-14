import React from 'react'
import styles from '../page.module.css';
import { getCategories, getWineData } from '../utils/data';
import MobileSearchForm from '../components/mobile/MobileSearchForm';

export default async function MobileSearch() {
    const { categories } = await getCategories();
    const { wineList } = await getWineData('current_inventory');

    return (
      <div className={styles.mobile_page}>
        <main className={styles.main}>
          <MobileSearchForm categories={categories} wineList={wineList} />
        </main>
      </div>
    )
}
