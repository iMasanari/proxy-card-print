import { css } from '@emotion/react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { jsPDF } from 'jspdf'
import React, { useEffect, useMemo, useRef } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  pdf: jsPDF
}

const ExportDialog = ({ open, onClose, pdf }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const url = useMemo(() => URL.createObjectURL(pdf.output('blob')), [pdf])

  useEffect(() => {
    return () => URL.revokeObjectURL(url)
  }, [url])

  const printPdf = () => {
    try {
      iframeRef.current!.contentWindow!.print()
    } catch {
      alert('印刷画面を開くことができませんでした。\nダウンロードして印刷してください。')
      return
    }

    onClose()
  }

  const downloadPdf = () => {
    if (!pdf) return

    // スマホの場合、新規タブで開く
    if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
      window.open(url)
      return
    }

    pdf.save(`プロキシカード印刷-${url.slice(-8)}.pdf`)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        エクスポート
      </DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          エクスポートの準備が完了しました。下記の方法で印刷してください。
        </DialogContentText>
        <DialogContentText fontWeight="bold">
          PCの場合
        </DialogContentText>
        <DialogContentText gutterBottom>
          「印刷」ボタンを押して印刷してください。
        </DialogContentText>
        <DialogContentText fontWeight="bold">
          スマートフォンの場合
        </DialogContentText>
        <DialogContentText gutterBottom>
          「ダウンロード」ボタンを押して保存してください。保存後、各印刷アプリ・サービスを使用して印刷してください。
        </DialogContentText>
        <DialogContentText fontWeight="bold">
          ※印刷時の注意
        </DialogContentText>
        <DialogContentText>
          「ふちなし印刷」またはそれに準ずる方法で印刷してください。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ mr: 'auto' }}>
          閉じる
        </Button>
        <Button onClick={printPdf}>
          印刷
        </Button>
        <Button onClick={downloadPdf}>
          ダウンロード
        </Button>
      </DialogActions>
      <iframe ref={iframeRef} src={url} css={css`display: none;`} />
    </Dialog>
  )
}

export default ExportDialog
