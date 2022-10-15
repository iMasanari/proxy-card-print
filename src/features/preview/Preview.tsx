import { css, Theme } from '@emotion/react'
import { Button } from '@mui/material'
import { useMemo, useRef, useState } from 'react'
import ExportDialog from './parts/ExportDialog'
import Page from './parts/Page'
import { createPdfFile } from './pdf'
import { PreviewData } from '~/domains/settings'

const previewStyle = (theme: Theme) => css`
  position: relative;
  ${theme.breakpoints.up('sm')} {
    display: flex;
    flex-direction: column;
  }
`

const containerStyle = (theme: Theme) => css`
  box-sizing: border-box;
  overflow: auto;
  width: 100%;
  border: 1px solid #ddd;
  background-color: gray;
  ${theme.breakpoints.up('sm')} {
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
  padding: ${theme.spacing(1)};
  text-align: center;
  background-color: #fff;
`

const exportButtonStyle = (theme: Theme) => css`
  width: 100%;
  ${theme.breakpoints.up('sm')} {
    width: auto;
  }
`

interface Props {
  className?: string
  data: PreviewData
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

const Preview = ({ className, data }: Props) => {
  const { pageWidth, pageHeight, cards, cardWidth, cardHeight } = data

  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [pdf, setPdf] = useState<File | null>(null)

  const colCount = Math.floor((pageWidth - pageMargin * 2) / cardWidth)
  const rowCount = Math.floor((pageHeight - pageMargin * 2) / cardHeight)

  const pages = useMemo(() => {
    const list = cards.reduce((acc, v) => {
      if (!v.count) return acc

      return [
        ...acc,
        ...[...Array(v.count).keys()].map(i => ({
          file: v.file,
          id: `${i}-${v.id}`,
        })),
      ]
    }, [] as { file: Blob, id: string }[])

    if (!list.length) {
      return [[]]
    }

    const rows = chunks(list, colCount)

    return chunks(rows, rowCount)
  }, [cards, colCount, rowCount])

  const openModal = async () => {
    const container = containerRef.current

    if (!container) return

    setOpen(true)
    setPdf(null)

    const pdf = await createPdfFile({
      svg: Array.from(container.getElementsByTagName('svg'), svg => svg.outerHTML),
      width: pageWidth,
      height: pageHeight,
    })

    if (!pdf) {
      setOpen(false)
      return
    }

    setPdf(pdf)
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
        <Button variant="contained" css={exportButtonStyle} onClick={openModal} disabled={open && !pdf}>
          印刷 / ダウンロード
        </Button>
      </div>
      {pdf && open && (
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
