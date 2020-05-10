import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import { CardType } from '~/modules/cards'
import getCroppedImage from '~/utils/getCroppedImage'
import Button from '../atoms/Button'

require('react-image-crop/dist/ReactCrop.css')
require('./Edit.css')

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
      <div className="EditModal-ReactCropWrapper" ref={wrapperRef}>
        <ReactCrop
          className="EditModal-ReactCrop"
          src={card.orgSrc}
          crop={crop}
          onChange={crop => setCrop(crop)}
          imageStyle={{ maxHeight: imageMaxHeight }}
          onImageLoaded={el => imageEl.current = el}
        />
      </div>
      <div className="EditModal-footer">
        <Button onClick={executeCrop}>
          {'切り取り'}
        </Button>
        <Button onClick={onRequestClose}>
          {'キャンセル'}
        </Button>
      </div>
    </>
  )
}
