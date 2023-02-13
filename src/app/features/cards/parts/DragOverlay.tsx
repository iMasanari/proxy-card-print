import { css } from '@emotion/react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

const overlayStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 4px dashed #666;
  border-radius: 20px;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  color: #444;
  pointer-events: none;
  z-index: 1;
`

const target = typeof window !== 'undefined' ? document.getElementById('app') : null

const DragOverlay = () => {
  const { t } = useTranslation()

  return (
    createPortal(
      <div className="app-modal" css={overlayStyle}>
        {t('DragOverlay.DropImagesHere', 'ここに画像をドロップ')}
      </div>,
      target!
    )
  )
}

export default DragOverlay
