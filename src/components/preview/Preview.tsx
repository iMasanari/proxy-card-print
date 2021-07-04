import { css, Theme } from '@emotion/react'
import { Button } from '@material-ui/core'
import React, { useEffect, useMemo, useReducer, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { cardsState } from '~/modules/cards'
import { assetValueSelector, cardHeightState, cardWidthState, defaultCountState } from '~/modules/settings'
import { createPdf } from '~/servise/pdf'

const previewStyle = css`
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`

const pdfStyle = css`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ddd;
  @media (min-width: 600px) {
    flex: 1;
  }
`

const actionsStyle = (theme: Theme) => css`
  margin: ${theme.spacing(1, 0)};
  text-align: center;
`

interface Props {
  className?: string
}

const pdfReducer = (prev: string | null, pdf: string | null) => {
  if (prev) {
    URL.revokeObjectURL(prev)
  }

  return pdf
}

const Preview = ({ className }: Props) => {
  const cards = useRecoilValue(cardsState)
  const defaultCount = useRecoilValue(defaultCountState)
  const { size, orientation } = useRecoilValue(assetValueSelector)
  const cardWidth = useRecoilValue(cardWidthState)
  const cardHeight = useRecoilValue(cardHeightState)

  const iFrameRef = useRef<HTMLIFrameElement>(null)
  const [pdf, updatePdf] = useReducer(pdfReducer, null)

  const list = useMemo(() => (
    cards.reduce((acc, v) => {
      const count = v.count ?? defaultCount ?? 0

      return count > 0 ? [...acc, ...Array(count).fill(v.src)] : acc
    }, [] as string[])
  ), [cards, defaultCount])

  const cardSize: [number, number] = useMemo(() => (
    [Math.min(Math.max(1, cardWidth || 0), 150), Math.min(Math.max(1, cardHeight || 0), 150)]
  ), [cardWidth, cardHeight])

  useEffect(() => {
    updatePdf(null)
    createPdf({ list, cardSize, size, orientation })
      .then(updatePdf)
  }, [list, cardSize, size, orientation])

  const print = () => {
    const contentWindow = iFrameRef.current?.contentWindow

    if (!contentWindow) return

    try {
      contentWindow.print()
    } catch {
      // Firefoxでエラーになる（cross-origin関連）
      alert('印刷画面を開くことができませんでした。\nプレビュー内に印刷ボタンがある場合は、そこから印刷できます。または、ダウンロードして印刷してください。')
    }
  }

  const download = () => {
    if (!pdf) return

    // スマホの場合、新規タブで開く
    if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
      open(pdf)
      return
    }

    const link = document.createElement('a')

    link.href = pdf
    link.download = `プロキシカード印刷-${pdf.slice(-8)}`
    link.click()
  }

  return (
    <div css={previewStyle} className={className}>
      <iframe css={pdfStyle} src={pdf || undefined} ref={iFrameRef} />
      <div css={actionsStyle}>
        <Button variant="contained" onClick={print}>
          {'印刷'}
        </Button>
        <Button onClick={download} sx={{ ml: 1 }}>
          {'ダウンロード'}
        </Button>
      </div>
    </div>
  )
}

export default Preview
