import { css } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import DownloadIcon from '@mui/icons-material/Download'
import PrintIcon from '@mui/icons-material/Print'
import SendToMobileIcon from '@mui/icons-material/SendToMobile'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import React, { useMemo, useRef } from 'react'
import { useBlobUrl } from '~/utils/blobUrlRef'

interface Props {
  open: boolean
  onClose: () => void
  pdf: File
}

const closeIconStyle = css`
  position: absolute;
  right: 8px;
  top: 8px;
`

const ExportDialog = ({ open, onClose, pdf }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const isMobile = useMemo(() => /iPhone|iPad|iPod|Android/.test(navigator.userAgent), [])
  const canShare = useMemo(() => navigator.canShare && navigator.canShare({ files: [pdf] }), [pdf])

  useBlobUrl(pdf, src => {
    if (iframeRef.current) {
      iframeRef.current.src = src
    }
  })

  const printPdf = () => {
    try {
      iframeRef.current!.contentWindow!.print()
    } catch {
      alert('印刷画面を開くことができませんでした。\nダウンロードして印刷してください。')
      return
    }
  }

  const downloadPdf = () => {
    const url = iframeRef.current?.src
    if (!url) return

    // スマホの場合、新規タブで開く
    if (isMobile) {
      window.open(url)
      return
    }

    const a = document.createElement('a')

    a.download = pdf.name
    a.href = url
    a.rel = 'noopener'

    a.click()
  }

  const exportPdf = () => {
    navigator.share({ files: [pdf] })
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          エクスポート
          <IconButton css={closeIconStyle} aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom textAlign="justify">
            エクスポートの準備が完了しました。下記の方法で印刷してください。
          </DialogContentText>
          <DialogContentText fontWeight="bold">
            PCの場合
          </DialogContentText>
          <DialogContentText gutterBottom textAlign="justify">
            「<PrintIcon fontSize="inherit" /> 印刷」ボタンを押して印刷してください。
          </DialogContentText>
          <DialogContentText fontWeight="bold">
            スマートフォン（iPhone）の場合
          </DialogContentText>
          <DialogContentText gutterBottom textAlign="justify">
            「<SendToMobileIcon fontSize="inherit" /> エクスポート」ボタンから「&quot;ファイル&quot;に保存」を選び、保存してください。保存後、各種印刷アプリ・サービスで印刷できます。
            <br />
            「<PrintIcon fontSize="inherit" /> 印刷」ボタンから印刷すると、縮小して印刷される可能性があります。
          </DialogContentText>
          <DialogContentText fontWeight="bold">
            ※印刷時の注意
          </DialogContentText>
          <DialogContentText gutterBottom textAlign="justify">
            フチなし印刷、または拡大・縮小無し(倍率 100%/用紙に合わせる)で印刷してください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<PrintIcon />} onClick={printPdf}>
            印刷
          </Button>
          <Button startIcon={<DownloadIcon />} onClick={downloadPdf}>
            保存
          </Button>
          {canShare && (
            <Button startIcon={<SendToMobileIcon />} onClick={exportPdf}>
              エクスポート
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <iframe ref={iframeRef} css={css`display: none;`} />
    </>
  )
}

export default ExportDialog
