import { css, Theme } from '@emotion/react'
import { Add, Edit as EditIcon, Remove, RestoreFromTrash as TrashIcon } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
import { useRef, useState } from 'react'
import { SettingsCard } from '../cardsReducer'
import { Crop } from '../types/crop'
import EditDialog from './EditDialog'
import NumberField from '~/common/atoms/NumberField'
import { useBlobUrl } from '~/utils/blobUrlRef'

interface Props {
  card: SettingsCard
  cardWidth: number
  cardHeight: number
  setCount: (count: string) => void
  setFile: (file: Blob) => void
  remove: () => void
}

const createInitCrop = (orgFile: Blob): Crop =>
  ({ file: orgFile, orgFile, x: 0, y: 0, rotation: 0, zoom: 1 })

const cardStyle = (theme: Theme) => css`
  display: flex;
  align-items: flex-end;
  padding: ${theme.spacing(0, 1)};
`

const thumbStyle = css`
  position: relative;
  flex: none;
  width: 30px;
  height: 43px;
  background: #ddd no-repeat center;
  background-size: contain;
  cursor: pointer;
`

const inputStyle = (theme: Theme) => css`
  margin: ${theme.spacing(0, 1)};
  flex: 1;
`

const cardActions = css`
  display: flex;
`

const Card = ({ card, cardWidth, cardHeight, setCount, setFile, remove }: Props) => {
  const [isOpen, setOpen] = useState(false)
  const [crop, setCrop] = useState<Crop>(() => createInitCrop(card.orgFile))
  const thumbRef = useRef<HTMLDivElement>(null)

  useBlobUrl(card.file, src => {
    if (thumbRef.current) {
      thumbRef.current.style.backgroundImage = `url(${src})`
    }
  })

  const onClose = (crop: Crop | null) => {
    setOpen(false)

    if (!crop) {
      setCrop(createInitCrop(card.orgFile))
      setFile(card.orgFile)
    } else {
      setCrop(crop)
      setFile(crop.file)
    }
  }

  return (
    <div css={cardStyle}>
      <div ref={thumbRef} css={thumbStyle} onClick={() => setOpen(true)} />
      <div css={inputStyle}>
        <NumberField
          spinButton={false}
          min={0}
          placeholder="0"
          value={card.count}
          onChange={e => setCount(e.currentTarget.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start" aria-label="減らす" onClick={() => setCount(`${Math.max(+card.count - 1, 0)}`)} >
                  <Remove />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                枚
                <IconButton edge="end" aria-label="増やす" onClick={() => setCount(`${+card.count + 1}`)}>
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div css={cardActions}>
        <IconButton aria-label="編集" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="削除" onClick={remove}>
          <TrashIcon />
        </IconButton>
      </div>
      <EditDialog
        open={isOpen}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        onClose={onClose}
        crop={crop}
      />
    </div>
  )
}

export default Card
