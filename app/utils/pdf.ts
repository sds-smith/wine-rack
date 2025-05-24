
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import { PageOrientation } from "pdfmake/interfaces";
import { Wine } from "../types/wine";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  'Roboto': {
     normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
     bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
     italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
     bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

function getDocDef(columnHeadings: string[], rows: string[][]) {
  return {
    pageOrientation: 'landscape' as PageOrientation,
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,

          body: [
            columnHeadings,
            ...rows
          ]
        }
      }
    ]
  };
}

export const makePdf = async (page: string) => {
  const response= await fetch(`/api/pdf?page=${page}`)
  const { wineList, columnHeadings} = await response.json()

  const rows: string[][] = wineList.map((wine: Wine) => Object.values({
    "Varietal": `${wine.Varietal}`,
    "Country": `${wine.Country}`,
    "Vintage": `${wine.Vintage}`,
    "Producer": `${wine.Producer}`,
    "Label": `${wine.Label}`,
    "Appellation": `${wine.Appellation}`,
    "Ready": `${wine.Ready.close || wine.Ready.close === wine.Ready.open ? `${wine.Ready.open }` : `${wine.Ready.open} - ${wine.Ready.close}`}`,
    "Source": `${wine.Source}`,
    "Price": `${wine.Price}`,
    "Acquired": `${wine.Acquired}`,
    "Notes": `${wine.Notes}`,
    "Quantity": `${wine.Quantity}`,
    "Comments": `${wine.Comments}`,
  }))

  const docDefinition = getDocDef(columnHeadings, rows)
  pdfMake.createPdf(docDefinition).print()
};