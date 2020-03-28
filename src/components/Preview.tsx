import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import React, { useReducer } from 'react'
import Modal from 'react-modal'
import PDF from '~/pdf/PDF'

require('./Preview.css')

interface Props {
  size: string
  orientation: 'portrait' | 'landscape'
  list: string[]
}

export default ({ size, orientation, list }: Props) => {
  const [isOpen, toggleOpen] = useReducer(state => !state, false)
  const pdf = <PDF size={size} orientation={orientation} list={list} />

  return (
    <>
      <button onClick={toggleOpen}>プレビュー・ダウンロード</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleOpen}
        className="Preview-modal"
        overlayClassName="Preview-overlay"
      >
        <PDFViewer className="Preview-pdf">
          {pdf}
        </PDFViewer>
        <div>
          <PDFDownloadLink document={pdf} className="Preview-download">
            {'ダウンロード'}
          </PDFDownloadLink>
        </div>
      </Modal>
    </>
  )
}