import { css } from '@emotion/react'
import React, { SVGProps, useRef } from 'react'
import { useBlobUrl } from '~/app/utils/blobUrlRef'

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
  page: { file: Blob, id: string }[][]
  cardWidth: number
  cardHeight: number
  pageWidth: number
  pageHeight: number
  pageMargin: number
}

const Page = ({ page, cardWidth, cardHeight, pageWidth, pageHeight, pageMargin }: Props) => {
  // FIXME: ../Preview.tsxと重複している
  const colCount = Math.floor((pageWidth - (pageMargin + 1) * 2) / cardWidth)
  const rowCount = Math.floor((pageHeight - (pageMargin + 1) * 2) / cardHeight)

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
          <BlobImage
            key={card.id}
            file={card.file}
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

const BlobImage = ({ file, ...rest }: SVGProps<SVGImageElement> & { file: Blob }) => {
  const ref = useRef<SVGImageElement>(null)

  useBlobUrl(file, src => {
    if (ref.current) {
      ref.current.href.baseVal = src
    }
  })

  return (
    <image ref={ref} {...rest} />
  )
}

export default Page
