import { css } from '@emotion/react'
import { Fragment, SVGProps, useRef } from 'react'
import { useBlobUrl } from '~/app/utils/blobUrlRef'
import { CardImageData } from '~/domains/settings'

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
  pageWidth: number
  pageHeight: number
  pageMargin: number
  gap: number
  colCount: number
  rowCount: number
  cards: { data: CardImageData, id: string }[][]
  cardWidth: number
  cardHeight: number
}

const Page = ({ pageWidth, pageHeight, pageMargin, gap, colCount, rowCount, cards, cardWidth, cardHeight }: Props) => {
  const marginX = (pageWidth - ((cardWidth + gap) * colCount - gap)) / 2
  const marginY = (pageHeight - ((cardHeight + gap) * rowCount - gap)) / 2

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${toPx(pageWidth)} ${toPx(pageHeight)}`}
      css={svgStyle}
    >
      {!!cards.length && (
        <>
          {range(cards[0].length).map((x) =>
            <line
              key={x}
              x1={toPx(marginX + (cardWidth + gap) * x)}
              y1={toPx(pageMargin)}
              x2={toPx(marginX + (cardWidth + gap) * x)}
              y2={toPx(pageHeight - pageMargin)}
              stroke="black"
            />
          )}
          {(gap ? range(cards[0].length) : [cards[0].length - 1]).map((x) =>
            <line
              key={x}
              x1={toPx(marginX + (cardWidth + gap) * x + cardWidth)}
              y1={toPx(pageMargin)}
              x2={toPx(marginX + (cardWidth + gap) * x + cardWidth)}
              y2={toPx(pageHeight - pageMargin)}
              stroke="black"
            />
          )}
          {range(cards.length).map((y) =>
            <line
              key={y}
              x1={toPx(pageMargin)}
              y1={toPx(marginY + (cardHeight + gap) * y)}
              x2={toPx(pageWidth - pageMargin)}
              y2={toPx(marginY + (cardHeight + gap) * y)}
              stroke="black"
            />
          )}
          {(gap ? range(cards.length) : [cards.length - 1]).map((y) =>
            <line
              key={y}
              x1={toPx(pageMargin)}
              y1={toPx(marginY + (cardHeight + gap) * y + cardHeight)}
              x2={toPx(pageWidth - pageMargin)}
              y2={toPx(marginY + (cardHeight + gap) * y + cardHeight)}
              stroke="black"
            />
          )}
        </>
      )}
      {cards.map((row, y) =>
        row.map((card, x) =>
          <rect
            key={card.id}
            width={toPx(cardWidth + 1 * 2)}
            height={toPx(cardHeight + 1 * 2)}
            x={toPx(marginX - 1 + (cardWidth + gap) * x)}
            y={toPx(marginY - 1 + (cardHeight + gap) * y)}
            fill="white"
          />
        )
      )}
      {cards.map((row, y) =>
        row.map((card, x) => {
          const top = marginY + (cardHeight + gap) * y
          const left = marginX + (cardWidth + gap) * x

          return (card.data.width > card.data.height) === (cardWidth > cardHeight) ? (
            <BlobImage
              key={card.id}
              file={card.data.file}
              preserveAspectRatio="none"
              x={toPx(left)}
              y={toPx(top)}
              width={toPx(cardWidth)}
              height={toPx(cardHeight)}
            />
          ) : (
            <BlobImage
              key={card.id}
              file={card.data.file}
              preserveAspectRatio="none"
              x={toPx(left)}
              y={toPx(top)}
              width={toPx(cardHeight)}
              height={toPx(cardWidth)}
              transform={`rotate(90 ${toPx(left + cardWidth / 2)} ${toPx(top + cardWidth / 2)})`}
            />
          )
        })
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
