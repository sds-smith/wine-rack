
import Link from 'next/link';
import Stack from '@mui/material/Stack'
import { getWineByID, getCategories } from '@/app/utils/data';
import styles from '../../../page.module.css';

type ViewWineProps = {
  params: Promise<{ id: string }>,
}

export default async function ViewWine(props: ViewWineProps) {
  const params = await props.params;
  const id = params.id;
  const wine = await getWineByID(id);
  const { categoriesByCode } = await getCategories();
  const category = `${wine.Category}  ${categoriesByCode[wine.Category].title}`

  return (
    <div className={styles.mobile_page}>
      <main className={styles.main}>
        <Link href={`/mobile`} >
          {`< back to search`}
        </Link>
        <Stack spacing={2} sx={{margin: '40px'}}>
          <h2>{`${wine.Producer}  ${wine.Varietal || wine.Label} ${wine.Vintage}`}</h2>
          <div>{`Category: ${category}`}</div>
          <div>{`Varietal: ${wine.Varietal}`}</div>
          <div>{`Country: ${wine.Country}`}</div>
          <div>{`Vintage: ${wine.Vintage}`}</div>
          <div>{`Producer: ${wine.Producer}`}</div>
          <div>{`Label: ${wine.Label}`}</div>
          <div>{`Appellation: ${wine.Appellation}`}</div>
          <div>{`Ready: ${wine.Ready.open} - ${wine.Ready.close}`}</div>
          <div>{`Source: ${wine.Source}`}</div>
          <div>{`Price: ${wine.Price || ' '}`}</div>
          <div>{`Acquired: ${wine.Acquired}`}</div>
          <div>{`Quantity: ${wine.Quantity}`}</div>
          <div>{`Comments: ${wine.Comments}`}</div>
        </Stack>
      </main>
    </div>
  )
}
