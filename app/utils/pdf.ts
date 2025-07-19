
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import { Content, PageOrientation } from "pdfmake/interfaces";
import { Wine, CategoriesByCode } from "../types/wine";
import { Page } from "./data";

type Cell = string | { text: string, style: {fillColor: string | undefined}}

pdfMake.fonts = {
  'Roboto': {
     normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
     bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
     italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
     bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

function getDocDef(page: Page, columnHeadings: string[], rows: Cell[][]) {
  const pageTitle = {
    text: page.split('_').map(word => word.toLocaleUpperCase()).join(' '),
    fontSize: 14, bold: true, marginBottom: 10
  };
  return {
    pageOrientation: 'landscape' as PageOrientation,
    defaultStyle: {
      fontSize: 10
    },
    footer: ((currentPage: number, pageCount: number): Content | undefined =>  ({
      text:`${page} ${currentPage} of ${pageCount}`,
      alignment: 'right',
      marginRight: 30
    })),
    content: [
      pageTitle,
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          dontBreakRows: true,
          widths: [ 55,  35,  35,  55,  55,  55,  35,  55,  35,  55,  30,  30,  60, ],
          body: [
            columnHeadings,
            ...rows
          ]
        }
      }
    ]
  };
}

function buildRows(data: Wine[], categoriesByCode: CategoriesByCode): Cell[][] {
  const spacerRow = Array(13).fill({text: '', style:{fillColor: '#eeeeee', lineHeight: 8}},)
  const footerRow = ['','','','','','','','','','','Total:',`${data.reduce((a, c)=>a+c.Quantity, 0)}`, '']
  const getFillColor = (wine: Wine) => categoriesByCode[wine.Category].color;
  const rows = data.flatMap((wine: Wine, idx: number) => {
    const row =  [
      { text: `${wine.Varietal || ''}`, style: { fillColor: getFillColor(wine) }},
      `${wine.Country || ''}`,
      `${wine.Vintage || ''}`,
      `${wine.Producer || ''}`,
      `${wine.Label || ''}`,
      `${wine.Appellation || ''}`,
      `${!wine.Ready.close || wine.Ready.close === wine.Ready.open ? `${wine.Ready.open }` : `${wine.Ready.open} - ${wine.Ready.close}`}`,
      `${wine.Source || ''}`,
      `${wine.Price || ''}`,
      `${wine.Acquired || ''}`,
      `${wine.Notes ? 'x' : ''}`,
      `${wine.Quantity}`,
      `${wine.Comments || ''}`,
    ]
    return (idx > 0 && wine.Category !== data[idx-1]?.Category) ? [spacerRow, row] :  [row]
  })
  rows.push(footerRow)
  return rows
}

export const generatePdf = async (page: Page | 'dashboard') => {
  const wineData = await fetch(`/api/wine_data?page=${page}`)
  const { wineList, columnHeadings, categoriesByCode } = await wineData.json()

  const rows = buildRows(wineList, categoriesByCode)
  const PAGE = page === 'dashboard' ? 'current_inventory' : page
  const docDefinition = getDocDef(PAGE, columnHeadings, rows)
  pdfMake.createPdf(docDefinition).print()
};