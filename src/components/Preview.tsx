import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import PDF from '~/pdf/PDF'

require('./Preview.css')

interface Props {
  size: string
  orientation: 'portrait' | 'landscape'
  list: string[]
  className?: string
}

export default ({ size, orientation, list, className }: Props) => {
  const pdf = <PDF size={size} orientation={orientation} list={list} />

  return (
    <div className={['Preview', className].join(' ')}>
      <PDFViewer className="Preview-pdf">
        {pdf}
      </PDFViewer>
      <div className="Preview-footer">
        <PDFDownloadLink document={pdf} className="Preview-download">
          {'印刷データをダウンロード'}
        </PDFDownloadLink>
      </div>
    </div>
  )
}
