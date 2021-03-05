import React, { useReducer, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Crop } from 'react-image-crop'
import Modal from 'react-modal'
import Button from '../atoms/Button'
import NumberFild from '../atoms/NumberFild'
import Edit from './Edit'
import { CardType } from '~/modules/cards'

// require('./Card.css')

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
      <div className="Card-count">
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
        <Button className="Card-button" onClick={toggleOpen}>
          <FaEdit className="svg-icon" />
        </Button>
        <Button className="Card-button" onClick={remove}>
          <FaTrash className="svg-icon" />
        </Button>
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
