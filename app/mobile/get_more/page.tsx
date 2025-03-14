
import List from '@mui/material/List';
import GetMoreListItem from '@/app/components/mobile/GetMoreListItem';
import { getWineData } from '@/app/utils/data';
import styles from '../../page.module.css';

export type GetMoreWines = {
    Category: string,
    Varietal: string | undefined,
    Country: string | undefined,
    Vintage: string | undefined,
    Producer: string,
    Label: string | undefined,
    Appellation: string | undefined,
    Source: string | undefined,
    Price: number | undefined,
    Acquired: string | undefined,
    Quantity: number,
    Comments: string | undefined,
    ID: string | undefined
}

export default async function MobileGetMore() {

    const { wineList } = await getWineData('get_more');

    const getMoreWines: GetMoreWines[] = wineList.map(wine => ({
        Category: wine.Category,
        Varietal: wine.Varietal,
        Country: wine.Country,
        Vintage: wine.Vintage,
        Producer: wine.Producer,
        Label: wine.Label,
        Appellation: wine.Appellation,
        Source: wine.Source,
        Price: wine.Price,
        Acquired: wine.Acquired,
        Quantity: wine.Quantity,
        Comments: wine.Comments,
        ID: wine.ID
    }))

    return (
        <div className={styles.mobile_page}>
          <main className={styles.main}>
            <h2>Get More:</h2>
            <List>
                { getMoreWines.map(wine => (
                    <GetMoreListItem key={wine.ID} wine={wine} />
                ))}
              
            </List>
          </main>
        </div>
    )
}
