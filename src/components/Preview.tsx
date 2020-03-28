import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import React, { useRef } from 'react'
import PDF from '~/pdf/PDF'

require('./Preview.css')

interface Props {
  size: string
  orientation: 'portrait' | 'landscape'
  list: string[]
  className?: string
}

export default ({ size, orientation, list, className }: Props) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const pdf = <PDF size={size} orientation={orientation} list={list} />

  const print = () => {
    const target = previewRef.current?.querySelector('iframe')?.contentWindow

    if (!target) return

    try {
      target.print()
    } catch {
      // Firefoxでエラーになる（cross-origin関連）
      alert('印刷画面を開くことができませんでした。\nプレビュー内に印刷ボタンがある場合は、そこから印刷できます。または、ダウンロードして印刷してください。')
    }
  }

  return (
    <div className={['Preview', className].join(' ')} ref={previewRef}>
      <PDFViewer className="Preview-pdf">
        {pdf}
      </PDFViewer>
      <div className="Preview-footer">
        <span className="Preview-button" role="button" onClick={print}>
          {'印刷'}
        </span>
        <PDFDownloadLink document={pdf} className="Preview-button">
          {'ダウンロード'}
        </PDFDownloadLink>
      </div>
    </div>
  )
}
