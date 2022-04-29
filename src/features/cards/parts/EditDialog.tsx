import { css, Theme } from '@emotion/react'
import { Button, Dialog, DialogActions, Slider } from '@mui/material'
import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Area, Point } from 'react-easy-crop/types'
import { getCroppedImage } from '../crop/getCroppedImage'
import { Crop } from '../types/crop'
import { createBlobURLRef, useBlobUrl } from '~/utils/blobUrlRef'

const wrapperStyle = css`
  position: relative;
  flex: 1;
`

const formStyle = (theme: Theme) => css`
  padding: ${theme.spacing(2, 3)};
`

interface Props {
  open: boolean
  onClose: (crop: Crop | null) => void
  cardWidth: number
  cardHeight: number
  crop: Crop
}

const EditDialog = ({ open, cardWidth, cardHeight, crop, onClose }: Props) => {
  const [point, setPoint] = useState<Point>({ x: crop.x, y: crop.y })
  const [rotation, setRotation] = useState(crop.rotation)
  const [zoom, setZoom] = useState(crop.zoom)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const orgSrc = useBlobUrl(crop.orgFile, 'editDialog')

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const executeCrop = async () => {
    if (!croppedAreaPixels) {
      onClose(crop)
      return
    }

    const orgRef = createBlobURLRef(crop.orgFile, 'edit2')

    const file = await getCroppedImage(orgRef.value, croppedAreaPixels, rotation)

    orgRef.revoke()
    onClose({ ...crop, ...point, file, rotation, zoom })
  }

  const reset = () => {
    setPoint({ x: 0, y: 0 })
    setRotation(0)
    setZoom(1)

    onClose(null)
  }

  if (!orgSrc) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose(crop)}
      PaperProps={{ sx: { width: '100%', height: '100%' } }}
      maxWidth={false}
    >
      <div css={wrapperStyle}>
        <Cropper
          image={orgSrc}
          crop={point}
          rotation={rotation}
          zoom={zoom}
          aspect={cardWidth / cardHeight}
          onCropChange={setPoint}
          // onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div css={formStyle}>
        <Slider
          value={-rotation}
          min={-180}
          max={180}
          valueLabelDisplay="auto"
          track={false}
          marks={[
            { value: -180, label: '-180°' },
            { value: -90, label: '-90°' },
            { value: 0, label: '0°' },
            { value: 90, label: '90°' },
            { value: 180, label: '180°' },
          ]}
          onChange={(e, value) => setRotation(-value)}
          aria-labelledby="Rotation"
        />
      </div>
      <DialogActions>
        <Button onClick={reset} sx={{ mr: 'auto' }}>
          元に戻す
        </Button>
        <Button onClick={() => onClose(crop)}>
          キャンセル
        </Button>
        <Button variant="contained" onClick={executeCrop}>
          切り取り
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDialog
