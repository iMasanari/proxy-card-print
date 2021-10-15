import { css, Theme } from '@emotion/react'
import { Button } from '@mui/material'
import { jsPDF } from 'jspdf'
import React, { useMemo, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import 'svg2pdf.js'
import ExportDialog from './ExportDialog'
import Page from './Page'
import { cardsState } from '~/modules/cards'
import { assetValueSelector, cardHeightState, cardWidthState, defaultCountState } from '~/modules/settings'

const previewStyle = css`
  position: relative;
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`

const containerStyle = css`
  box-sizing: border-box;
  overflow: auto;
  width: 100%;
  border: 1px solid #ddd;
  background-color: gray;
  @media (min-width: 600px) {
    flex: 1;
  }
`

const pageStyle = (theme: Theme) => css`
  background-color: #fff;
  margin: ${theme.spacing(1)};
`

const actionsStyle = (theme: Theme) => css`
  position: sticky;
  bottom: 0;
  padding: ${theme.spacing(1, 0)};
  text-align: center;
  background-color: #fff;
`

interface Props {
  className?: string
}

const pageMargin = 10

const chunks = <T,>(array: T[], chunk: number) => {
  const len = Math.ceil(array.length / chunk)
  const result: T[][] = Array(Math.ceil(array.length / chunk))

  for (let i = 0; i < len; i++) {
    result[i] = array.slice(i * chunk, (i + 1) * chunk)
  }

  return result
}

const Preview = ({ className }: Props) => {
  const cards = useRecoilValue(cardsState)
  const defaultCount = useRecoilValue(defaultCountState)
  const { size, orientation } = useRecoilValue(assetValueSelector)
  const _cardWidth = useRecoilValue(cardWidthState)
  const _cardHeight = useRecoilValue(cardHeightState)
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [pdf, setPdf] = useState<jsPDF | null>(null)

  const pageSize = size === 'A4' ? [210, 297] : [297, 420]
  const [pageWidth, pageHeight] = orientation === 'portrait' ? pageSize : [pageSize[1], pageSize[0]]

  const cardWidth = Math.min(Math.max(1, _cardWidth || 0), pageWidth)
  const cardHeight = Math.min(Math.max(1, _cardHeight || 0), pageHeight)

  const colCount = Math.floor((pageWidth - pageMargin * 2) / cardWidth)
  const rowCount = Math.floor((pageHeight - pageMargin * 2) / cardHeight)

  const pages = useMemo(() => {
    const list = cards.reduce((acc, v) => {
      const count = v.count ?? defaultCount ?? 0
      const list = [...Array(count).keys()].map(i => ({
        src: v.src,
        id: `${i}-${v.src}`,
      }))

      return count > 0 ? [...acc, ...list] : acc
    }, [] as { src: string, id: string }[])

    if (!list.length) {
      return [[]]
    }

    const rows = chunks(list, colCount)

    return chunks(rows, rowCount)
  }, [cards, defaultCount, colCount, rowCount])

  const createPdf = async () => {
    const container = containerRef.current

    if (!container) return

    const pdf = new jsPDF(orientation, 'mm', [pageWidth, pageHeight])

    for (const [index, svg] of [...container.getElementsByTagName('svg')].entries()) {
      // 改ページ
      if (index) {
        pdf.addPage()
      }

      await pdf.svg(svg)
    }

    return pdf
  }

  const openModal = async () => {
    setPdf(null)

    const pdf = await createPdf()

    if (!pdf) return

    setPdf(pdf)
    setOpen(true)
  }

  return (
    <div css={previewStyle} className={className}>
      <div css={containerStyle} ref={containerRef}>
        {pages.map((page, index) =>
          <div key={index} css={pageStyle}>
            <Page
              page={page}
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              pageMargin={pageMargin}
            />
          </div>
        )}
      </div>
      <div css={actionsStyle}>
        <Button variant="contained" onClick={openModal}>
          印刷 / ダウンロード
        </Button>
      </div>
      {pdf && (
        <ExportDialog
          open={open}
          onClose={() => setOpen(false)}
          pdf={pdf}
        />
      )}
    </div>
  )
}

export default Preview
