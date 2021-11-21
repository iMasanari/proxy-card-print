import { css, Theme } from '@emotion/react'
import { Button } from '@mui/material'
import { jsPDF } from 'jspdf'
import React, { useMemo, useRef, useState } from 'react'
import 'svg2pdf.js'
import ExportDialog from './ExportDialog'
import Page from './Page'
import { SettingsType } from '~/domains/settings'

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
  settings: SettingsType
}

const pageMargin = 7

const chunks = <T,>(array: T[], chunk: number) => {
  const len = Math.ceil(array.length / chunk)
  const result: T[][] = Array(Math.ceil(array.length / chunk))

  for (let i = 0; i < len; i++) {
    result[i] = array.slice(i * chunk, (i + 1) * chunk)
  }

  return result
}

const Preview = ({ className, settings }: Props) => {
  const { pageWidth, pageHeight, cards, cardWidth, cardHeight } = settings

  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [pdf, setPdf] = useState<jsPDF | null>(null)

  const colCount = Math.floor((pageWidth - pageMargin * 2) / cardWidth)
  const rowCount = Math.floor((pageHeight - pageMargin * 2) / cardHeight)

  const pages = useMemo(() => {
    const list = cards.reduce((acc, v) => {
      if (!v.count) return acc

      return [
        ...acc,
        ...[...Array(v.count).keys()].map(i => ({
          src: v.src,
          id: `${i}-${v.id}`,
        })),
      ]
    }, [] as { src: string, id: string }[])

    if (!list.length) {
      return [[]]
    }

    const rows = chunks(list, colCount)

    return chunks(rows, rowCount)
  }, [cards, colCount, rowCount])

  const createPdf = async () => {
    const container = containerRef.current

    if (!container) return

    const orientation = pageWidth < pageHeight ? 'p' : 'l'
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
