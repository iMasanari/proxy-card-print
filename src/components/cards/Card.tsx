import React, { useReducer, useState } from 'react'
import { Crop } from 'react-image-crop'
import Modal from 'react-modal'
import NumberFild from '../atoms/NumberFild'
import Edit from './Edit'

require('./Card.css')

export interface CardType {
  id: string
  src: string
  orgSrc: string
  count: number | null
}

interface Props {
  card: CardType
  defaultCount: number | null
  setCount: (count: number | null) => void
  setSrc: (src: string) => void
  remove: () => void
}

const toggleReducer = (state: boolean) => !state
const initCrop: Crop = { aspect: 59 / 86 }

export default ({ card, defaultCount, setCount, setSrc, remove }: Props) => {
  const [isOpen, toggleOpen] = useReducer(toggleReducer, false)
  const [crop, setCrop] = useState(initCrop)

  return (
    <div className="Card">
      <div
        className="Card-thumb"
        style={{ backgroundImage: card.src ? `url(${card.src})` : undefined }}
        onClick={toggleOpen}
      />
      <div>
        <NumberFild
          type="number"
          min="0"
          placeholder={defaultCount || 0 as any}
          value={card.count}
          setValue={setCount}
        />
        {'枚'}
      </div>
      <div>
        <button onClick={toggleOpen}>編集</button>
        <button onClick={remove}>削除</button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleOpen}
        className="EditModal-modal"
        overlayClassName="EditModal-overlay"
      >
        <Edit
          card={card}
          onRequestClose={toggleOpen}
          crop={crop}
          setCrop={setCrop}
          update={setSrc}
        />
      </Modal>
    </div>
  )
}
