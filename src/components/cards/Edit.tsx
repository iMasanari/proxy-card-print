import { css } from '@emotion/react'
import { Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import { CardType } from '~/modules/cards'
import getCroppedImage from '~/utils/getCroppedImage'

const wrapperStyle = css`
  flex: 1;
  overflow: hidden;
  text-align: center;
`

const reactCropStyle = css`
  user-select: none;
  -webkit-touch-callout: none;
`

const actionsStyle = css`
  margin: 0.5rem 0;
  background-color: #fff;
  text-align: center;
`

interface Props {
  card: CardType
  onRequestClose: () => void
  update: (src: string) => void
  crop: Crop
  setCrop: (crop: Crop) => void
}

export default ({ card, onRequestClose, update, crop: orgCrop, setCrop: setOrgCrop }: Props) => {
  const [crop, setCrop] = useState(orgCrop)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imageEl = useRef<HTMLImageElement>()
  const [imageMaxHeight, setImageMaxHeight] = useState<number>()

  useEffect(() => {
    const listener = () => {
      if (wrapperRef.current) {
        const { height } = wrapperRef.current.getBoundingClientRect()
        setImageMaxHeight(height)
      }
    }

    listener()
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [])

  const executeCrop = async () => {
    onRequestClose()
    setOrgCrop(crop)
    update(crop.width ? await getCroppedImage(imageEl.current!, crop as Required<Crop>) : card.orgSrc)
  }

  return (
    <>
      <div css={wrapperStyle} ref={wrapperRef}>
        <ReactCrop
          css={reactCropStyle}
          src={card.orgSrc}
          crop={crop}
          onChange={crop => setCrop(crop)}
          imageStyle={{ maxHeight: imageMaxHeight }}
          onImageLoaded={el => { imageEl.current = el }}
        />
      </div>
      <div css={actionsStyle}>
        <Button variant="contained" onClick={executeCrop}>
          切り取り
        </Button>
        <Button onClick={onRequestClose} sx={{ ml: 1 }}>
          キャンセル
        </Button>
      </div>
    </>
  )
}
