import { css, Theme } from '@emotion/react'
import { Button } from '@mui/material'
import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

const chunks = <T,>(array: T[], chunk: number) => {
  const len = Math.ceil(array.length / chunk)
  const result: T[][] = Array(Math.ceil(array.length / chunk))

  for (let i = 0; i < len; i++) {
    result[i] = array.slice(i * chunk, (i + 1) * chunk)
  }

  return result
}

const Preview = ({ className, data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [pdf, setPdf] = useState<File | null>(null)
  const { t } = useTranslation()

  const rows = chunks(data.cards, data.colCount)
  const pages = rows.length ? chunks(rows, data.rowCount) : [[]]

  const openModal = async () => {
    const container = containerRef.current

    if (!container) return

    setOpen(true)
    setPdf(null)

    const pageSize = data.pageSize === 'レターサイズ' ? 'LTR' : data.pageSize

    const pdf = await createPdfFile({
      name: `${t('Preview.pdfName', 'プロキシカード印刷')}-${pageSize}`,
      svg: Array.from(container.getElementsByTagName('svg'), svg => svg.outerHTML),
      width: data.pageWidth,
      height: data.pageHeight,
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
        {pages.map((cards, index) =>
          <div key={index} css={pageStyle}>
            <Page
              cards={cards}
              pageWidth={data.pageWidth}
              pageHeight={data.pageHeight}
              pageMargin={data.pageMargin}
              colCount={data.colCount}
              rowCount={data.rowCount}
              cardWidth={data.cardWidth}
              cardHeight={data.cardHeight}
            />
          </div>
        )}
      </div>
      <div css={actionsStyle}>
        <Button variant="contained" css={exportButtonStyle} onClick={openModal} disabled={open && !pdf}>
          {t('Preview.printSlashDownload', '印刷 / ダウンロード')}
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
