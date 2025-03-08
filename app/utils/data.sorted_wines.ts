import { getWineData, getCategories } from '../utils/data';
import { Category } from '../types/wine';

const { wineList } = await getWineData('current_inventory');
const { categoriesByCode } = await getCategories();

export const sorted_wines = {
    Category : wineList.reduce((acc, curr) => ({
        ...acc,
        [curr.Category] : (acc[curr.Category as keyof typeof acc] || 0) + curr.Quantity
    }), {}),
      
    Vintage : wineList.reduce((acc, curr) => ({
      ...acc,
      [`${curr.Vintage || 'NV'}`] : (acc[curr.Vintage as keyof typeof acc] || 0) + curr.Quantity
    }), {}),
    
    Ready : wineList.reduce((acc, curr) => ({
      ...acc,
      [`${curr.Ready.open}`] : (acc[curr.Ready.open as keyof typeof acc] || 0) + curr.Quantity
    }), {}),
    
    Group : wineList.reduce((acc, curr) => {
      const currKey = curr.Category;
      const groupKey = (categoriesByCode[currKey as keyof typeof categoriesByCode] as Category)?.group
      return {
      ...acc,
      ...( groupKey && {[groupKey as keyof typeof acc] : (acc[groupKey as keyof typeof acc] || 0) + curr.Quantity})
    }}, {}),
}
  
