import { css } from '@emotion/react'
import React from 'react'

const svgStyle = css`
  display:block;
  max-width: 100%;
`

const dpi = 350
const inch = 2.54

const toPx = (mm: number) =>
  Math.round(dpi * mm / 10 / inch)

const range = (length: number) =>
  Array.from({ length }, (_, i) => i)

interface Props {
  page: { src: string, id: string }[][]
  cardWidth: number
  cardHeight: number
  pageWidth: number
  pageHeight: number
  pageMargin: number
}

const Page = ({ page, cardWidth, cardHeight, pageWidth, pageHeight, pageMargin }: Props) => {
  const colCount = Math.floor((pageWidth - pageMargin * 2) / cardWidth)
  const rowCount = Math.floor((pageHeight - pageMargin * 2) / cardHeight)
  const marginX = (pageWidth - cardWidth * colCount) / 2
  const marginY = (pageHeight - cardHeight * rowCount) / 2

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${toPx(pageWidth)} ${toPx(pageHeight)}`}
      css={svgStyle}
    >
      {!!page.length && (
        <>
          {range(page[0].length + 1).map((x) =>
            <line
              key={x}
              x1={toPx(marginX + cardWidth * x)}
              y1={toPx(pageMargin)}
              x2={toPx(marginX + cardWidth * x)}
              y2={toPx(pageHeight - pageMargin)}
              stroke="black"
            />
          )}
          {range(page.length + 1).map((y) =>
            <line
              key={y}
              x1={toPx(pageMargin)}
              y1={toPx(marginY + cardHeight * y)}
              x2={toPx(pageWidth - pageMargin)}
              y2={toPx(marginY + cardHeight * y)}
              stroke="black"
            />
          )}
        </>
      )}
      {page.map((row, y) =>
        row.map((card, x) =>
          <rect
            key={card.id}
            width={toPx(cardWidth + 1 * 2)}
            height={toPx(cardHeight + 1 * 2)}
            x={toPx(marginX - 1 + cardWidth * x)}
            y={toPx(marginY - 1 + cardHeight * y)}
            fill="white"
          />
        )
      )}
      {page.map((row, y) =>
        row.map((card, x) =>
          <image
            key={card.id}
            href={card.src}
            preserveAspectRatio="none"
            width={toPx(cardWidth)}
            height={toPx(cardHeight)}
            x={toPx(marginX + cardWidth * x)}
            y={toPx(marginY + cardHeight * y)}
          />
        )
      )}
    </svg>
  )
}

export default Page
