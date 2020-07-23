import React, { useEffect, useMemo, useReducer, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { cardsState } from '~/modules/cards'
import { assetValueSelector, cardHeightState, cardWidthState, defaultCountState } from '~/modules/settings'
import { createPdf } from '~/servise/pdf'
import classList from '~/utils/classList'
import Button from '../atoms/Button'

require('./Preview.css')

interface Props {
  className?: string
}

const pdfReducer = (prev: string | null, pdf: string | null) => {
  if (prev) {
    URL.revokeObjectURL(prev)
  }

  return pdf
}

export default ({ className }: Props) => {
  const cards = useRecoilValue(cardsState)
  const defaultCount = useRecoilValue(defaultCountState)
  const { size, orientation } = useRecoilValue(assetValueSelector)
  // const { size, orientation } = { size: 'A4', orientation: 'portrait' } as const
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
    <div className={classList('Preview', className)}>
      <iframe className="Preview-pdf" src={pdf || undefined} ref={iFrameRef} />
      <div className="Preview-footer">
        <Button onClick={print}>
          {'印刷'}
        </Button>
        <Button onClick={download}>
          {'ダウンロード'}
        </Button>
      </div>
    </div>
  )
}
