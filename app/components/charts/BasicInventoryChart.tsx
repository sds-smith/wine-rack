
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

type BasicInventoryChartProps = {
  sortedWineList: {[key: string] : number},
  title: string
}

export default async function BasicInventoryChart({sortedWineList, title} : BasicInventoryChartProps) {
  const data = Object.values(sortedWineList)

  return (
    <Box width={{xs: 600, lg: 575}}>
      <h6>{title}</h6>
      <BarChart
        xAxis={[{ scaleType: 'band', data: Object.keys(sortedWineList)}]}
        series={[{ data }]}
        height={300}
        barLabel="value"
      />
    </Box>
  );
}