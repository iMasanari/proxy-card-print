import { css, Theme } from '@emotion/react'
import { Add, Edit as EditIcon, Remove, RestoreFromTrash as TrashIcon } from '@mui/icons-material'
import { IconButton, InputAdornment, Typography } from '@mui/material'
import { useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingsCard } from '../cardsReducer'
import { Crop } from '../types/crop'
import EditDialog from './EditDialog'
import NumberField from '~/app/common/atoms/NumberField'
import { useBlobUrl } from '~/app/utils/blobUrlRef'
import { CardImageData } from '~/domains/settings'

interface Props {
  card: SettingsCard
  cardWidth: number
  cardHeight: number
  setCount: (count: string) => void
  setCardData: (data: CardImageData) => void
  remove: () => void
}

const createInitCrop = (card: SettingsCard): Crop => ({
  data: card.orgData,
  orgData: card.orgData,
  x: 0,
  y: 0,
  rotation: 0,
  zoom: 1,
})

const cardStyle = (theme: Theme) => css`
  display: flex;
  align-items: flex-end;
  padding: ${theme.spacing(0, 1)};
`

const thumbStyle = css`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: #ddd no-repeat center;
  background-size: contain;
  cursor: pointer;
`

const inputStyle = (theme: Theme) => css`
  margin: ${theme.spacing(0, 1)};
  flex: 1;
`

const cardUnitStyle = css`
  &:lang(en) {
    font-size: 0.7em;
  }
`

const cardActions = css`
  display: flex;
`

const Card = ({ card, cardWidth, cardHeight, setCount, setCardData, remove }: Props) => {
  const [isOpen, setOpen] = useState(false)
  const [crop, setCrop] = useState<Crop>(() => createInitCrop(card))
  const thumbRef = useRef<HTMLDivElement>(null)
  const labelId = useId()
  const { t } = useTranslation()

  useBlobUrl(card.data.file, src => {
    if (thumbRef.current) {
      thumbRef.current.style.backgroundImage = `url(${src})`
    }
  })

  const onClose = (crop: Crop | null) => {
    setOpen(false)

    if (!crop) {
      setCrop(createInitCrop(card))
      setCardData(card.orgData)
    } else {
      setCrop(crop)
      setCardData(crop.data)
    }
  }

  return (
    <div css={cardStyle}>
      <div ref={thumbRef} css={thumbStyle} onClick={() => setOpen(true)} />
      <div css={inputStyle}>
        <NumberField
          id={labelId}
          min={0}
          placeholder="0"
          value={card.count}
          onChange={e => setCount(e.currentTarget.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  edge="start"
                  aria-label={t('Card.decrement', '減らす')!}
                  onClick={() => setCount(`${Math.max(parseInt(card.count, 10) - 1, 0)}`)}
                >
                  <Remove />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Typography component="label" htmlFor={labelId} css={cardUnitStyle}>
                  {t('Card.cardUnits', '枚')}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label={t('Card.increment', '増やす')!}
                  onClick={() => setCount(`${parseInt(card.count, 10) + 1}`)}
                >
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div css={cardActions}>
        <IconButton aria-label={t('Card.edit', '編集')!} onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label={t('Card.delete', '削除')!} onClick={remove}>
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
