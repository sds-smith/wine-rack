
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import { PageOrientation } from "pdfmake/interfaces";
import { Wine, CategoriesByCode } from "../types/wine";

type Cell = string | { text: string, style: {fillColor: string | undefined}}

pdfMake.fonts = {
  'Roboto': {
     normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
     bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
     italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
     bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

function getDocDef(page: string, columnHeadings: string[], rows: Cell[][]) {
  const pageTitle = {
    text: page.split('_').map(word => word.toLocaleUpperCase()).join(' '),
    fontSize: 14, bold: true, marginBottom: 10
  };
  return {
    pageOrientation: 'landscape' as PageOrientation,
    defaultStyle: {
      fontSize: 10
    },
    footer: ((currentPage: { toString: () => string; }, pageCount: string) =>  ({
      text:`${page} ${currentPage.toString()} of ${pageCount}`,
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
    const row =  Object.values({
      "Varietal": { text: `${wine.Varietal || ''}`, style: { fillColor: getFillColor(wine) }},
      "Country": `${wine.Country || ''}`,
      "Vintage": `${wine.Vintage || ''}`,
      "Producer": `${wine.Producer || ''}`,
      "Label": `${wine.Label || ''}`,
      "Appellation": `${wine.Appellation || ''}`,
      "Ready": `${!wine.Ready.close || wine.Ready.close === wine.Ready.open ? `${wine.Ready.open }` : `${wine.Ready.open} - ${wine.Ready.close}`}`,
      "Source": `${wine.Source || ''}`,
      "Price": `${wine.Price || ''}`,
      "Acquired": `${wine.Acquired || ''}`,
      "Notes": `${wine.Notes ? 'x' : ''}`,
      "Quantity": `${wine.Quantity}`,
      "Comments": `${wine.Comments || ''}`,
    })
    return (idx > 0 && wine.Category !== data[idx-1]?.Category) ? [spacerRow, row] :  [row]
  })
  rows.push(footerRow)
  return rows
}

export const makePdf = async (page: string) => {
  const response= await fetch(`/api/pdf?page=${page}`)
  const { wineList, columnHeadings, categoriesByCode } = await response.json()

  const rows = buildRows(wineList, categoriesByCode)
  const docDefinition = getDocDef(page, columnHeadings, rows)
  pdfMake.createPdf(docDefinition).print()
};