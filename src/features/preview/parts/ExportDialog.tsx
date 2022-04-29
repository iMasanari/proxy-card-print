import { css } from '@emotion/react'
import DownloadIcon from '@mui/icons-material/Download'
import IosShareIcon from '@mui/icons-material/IosShare'
import PrintIcon from '@mui/icons-material/Print'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useRef } from 'react'
import { useBlobUrl } from '~/utils/blobUrlRef'

interface Props {
  open: boolean
  onClose: () => void
  pdf: Blob
}

const ExportDialog = ({ open, onClose, pdf }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const pdfUrl = useBlobUrl(pdf, 'export')

  const printPdf = () => {
    try {
      iframeRef.current!.contentWindow!.print()
    } catch {
      alert('印刷画面を開くことができませんでした。\nダウンロードして印刷してください。')
      return
    }
  }

  const downloadPdf = () => {
    if (!pdfUrl) return

    // スマホの場合、新規タブで開く
    if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
      window.open(pdfUrl)
      return
    }

    const a = document.createElement('a')

    a.download = `プロキシカード印刷-${pdfUrl.slice(-8)}.pdf`
    a.href = pdfUrl
    a.rel = 'noopener'

    a.click()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        エクスポート
      </DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom textAlign="justify">
          エクスポートの準備が完了しました。下記の方法で印刷してください。
        </DialogContentText>
        <DialogContentText fontWeight="bold">
          PCの場合
        </DialogContentText>
        <DialogContentText gutterBottom textAlign="justify">
          「印刷」ボタンを押して印刷してください。
        </DialogContentText>
        <DialogContentText fontWeight="bold">
          スマートフォン（iPhone）の場合
        </DialogContentText>
        <DialogContentText gutterBottom textAlign="justify">
          「ダウンロード」ボタンを押してPDFを新しいタブで開き、
          <IosShareIcon fontSize="inherit" />
          ボタンから「&quot;ファイル&quot;に保存」で保存できます。保存後、各種印刷アプリ・サービスで印刷してください。
          <br />
          「印刷」ボタンから印刷すると、縮小して印刷される可能性があります。
        </DialogContentText>
        <DialogContentText fontWeight="bold">
          ※印刷時の注意
        </DialogContentText>
        <DialogContentText gutterBottom textAlign="justify">
          フチなし印刷、または拡大・縮小無し(倍率 100%/用紙に合わせる)で印刷してください。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ mr: 'auto' }}>
          閉じる
        </Button>
        <Button startIcon={<PrintIcon />} onClick={printPdf}>
          印刷
        </Button>
        <Button startIcon={<DownloadIcon />} onClick={downloadPdf}>
          ダウンロード
        </Button>
      </DialogActions>
      <iframe ref={iframeRef} src={pdfUrl} css={css`display: none;`} />
    </Dialog>
  )
}

export default ExportDialog
