import PDFDocument from './lib/pdfkit'
import { chunk, readFile, toBlobURL, toPoint } from './utils'

export interface Condition {
  size: string
  orientation: 'portrait' | 'landscape'
  list: string[]
  cardSize: [number, number]
}

export type Result = string

const margin = toPoint(10)

export default async ({ list, cardSize, size, orientation }: Condition): Promise<Result> => {
  const [cardWidth, cardHeight] = cardSize.map(toPoint)
  const doc = new PDFDocument({ size, layout: orientation })

  const rowCount = Math.floor((doc.page.height - margin * 2) / cardHeight)
  const colCount = Math.floor((doc.page.width - margin * 2) / cardWidth)

  const marginTop = (doc.page.height - cardHeight * rowCount) / 2
  const marginLeft = (doc.page.width - cardWidth * colCount) / 2

  const pages = chunk(list, rowCount * colCount).map(v =>
    chunk(v, colCount)
  )

  for (const [pageCount, page] of pages.entries()) {
    // 2ページ目以降の場合、改ページ
    if (pageCount) {
      doc.addPage()
    }

    // 切り取り線
    for (let i = 0, len = page.length + 1; i < len; ++i) {
      const y = i * cardHeight + marginTop
      doc.moveTo(margin, y).lineTo(doc.page.width - margin, y).stroke('#666')
    }
    for (let i = 0, len = page[0].length + 1; i < len; ++i) {
      const x = i * cardWidth + marginLeft
      doc.moveTo(x, margin).lineTo(x, doc.page.height - margin).stroke('#666')
    }

    // カード表示
    for (const [y, cols] of page.entries()) {
      for (const [x, src] of cols.entries()) {
        const buffer = await readFile(src)

        doc.image(buffer, x * cardWidth + marginLeft, y * cardHeight + marginTop, {
          width: cardWidth,
          height: cardHeight,
        })
      }
    }
  }

  doc.end()

  return toBlobURL(doc)
}
