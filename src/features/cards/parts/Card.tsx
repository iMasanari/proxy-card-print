import { css, Theme } from '@emotion/react'
import { Add, Edit as EditIcon, Remove, RestoreFromTrash as TrashIcon } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { SettingsCard } from '../cardsReducer'
import { Crop } from '../types/crop'
import EditDialog from './EditDialog'
import NumberField from '~/common/atoms/NumberField'

interface Props {
  card: SettingsCard
  cardWidth: number
  cardHeight: number
  cardInitCount: number
  setCount: (count: string) => void
  setSrc: (src: string) => void
  remove: () => void
}

const createInitCrop = (orgSrc: string): Crop =>
  ({ src: orgSrc, orgSrc, x: 0, y: 0, rotation: 0, zoom: 1 })

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

const Card = ({ card, cardWidth, cardHeight, cardInitCount, setCount, setSrc, remove }: Props) => {
  const [isOpen, setOpen] = useState(false)
  const [crop, setCrop] = useState<Crop>(() => createInitCrop(card.orgSrc))

  const onClose = (crop: Crop | null) => {
    setOpen(false)

    if (!crop) {
      setCrop(createInitCrop(card.orgSrc))
      setSrc(card.orgSrc)
    } else {
      setCrop(crop)
      setSrc(crop.src)
    }
  }

  return (
    <div css={cardStyle}>
      <div
        css={thumbStyle}
        style={{ backgroundImage: card.src ? `url(${card.src})` : undefined }}
        onClick={() => setOpen(true)}
      />
      <div css={inputStyle}>
        <NumberField
          spinButton={false}
          min={0}
          placeholder={`${cardInitCount}`}
          value={card.count}
          onChange={e => setCount(e.currentTarget.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start" onClick={() => setCount(`${Math.max(+(card.count || cardInitCount) - 1, 0)}`)} >
                  <Remove />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                枚
                <IconButton edge="end" onClick={() => setCount(`${+(card.count || cardInitCount) + 1}`)}>
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div css={cardActions}>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={remove}>
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
