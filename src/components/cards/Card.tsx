import { css, Theme } from '@emotion/react'
import { Edit as EditIcon, RestoreFromTrash as TrashIcon } from '@mui/icons-material'
import { Dialog, IconButton, InputAdornment } from '@mui/material'
import { useReducer, useState } from 'react'
import { Crop } from 'react-image-crop'
import NumberField, { toNumberOrNull } from '../atoms/NumberField'
import Edit from './Edit'
import { CardType } from '~/modules/cards'

interface Props {
  card: CardType
  defaultCount: number | null
  setCount: (count: number | null) => void
  setSrc: (src: string) => void
  remove: () => void
}

const toggleReducer = (state: boolean) => !state
const initCrop: Crop = { aspect: 59 / 86 } as Crop

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
`

const cardActions = css`
  display: flex;
`

const Card = ({ card, defaultCount, setCount, setSrc, remove }: Props) => {
  const [isOpen, toggleOpen] = useReducer(toggleReducer, false)
  const [crop, setCrop] = useState(initCrop)

  return (
    <div css={cardStyle}>
      <div
        css={thumbStyle}
        style={{ backgroundImage: card.src ? `url(${card.src})` : undefined }}
        onClick={toggleOpen}
      />
      <div css={inputStyle}>
        <NumberField
          min={0}
          placeholder={`${defaultCount || 0}`}
          value={card.count ?? ''}
          onChange={e => setCount(toNumberOrNull(e.currentTarget.value))}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                枚
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div css={cardActions}>
        <IconButton onClick={toggleOpen}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={remove}>
          <TrashIcon />
        </IconButton>
      </div>
      <Dialog
        open={isOpen}
        onClose={toggleOpen}
        PaperProps={{ sx: { width: '100%', height: '100%' } }}
        maxWidth={false}
      >
        <Edit
          card={card}
          onRequestClose={toggleOpen}
          crop={crop}
          setCrop={setCrop}
          update={setSrc}
        />
      </Dialog>
    </div>
  )
}

export default Card
