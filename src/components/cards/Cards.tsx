import React, { useEffect, useState } from 'react'
import AddCard from './AddCard'
import Card, { CardType } from './Card'

require('./Cards.css')

interface Props {
  cards: CardType[]
  defaultCount: number | null
  addCards: (srcList: string[]) => void
  updateCardCount: (index: number, count: number | null) => void
  removeCard: (index: number) => void
}

const preventDefault = (e: Pick<Event, 'preventDefault'>) => {
  e.preventDefault()
}

export default ({ cards, defaultCount, addCards, updateCardCount, removeCard }: Props) => {
  const [isDraging, setDraging] = useState(false)

  useEffect(() => {
    const bodyListener = (e: Event) => {
      setDraging(e.type === 'dragover')
    }

    document.body.addEventListener('dragover', bodyListener)
    document.body.addEventListener('dragleave', bodyListener)
  }, [])

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const srcList = Array.from(e.dataTransfer!.files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => URL.createObjectURL(file))

    addCards(srcList)
    setDraging(false)
  }

  return (
    <div className="Cards" onDragOver={preventDefault} onDrop={onDrop}>
      {!cards.length ? <p className="Cards-none">カード画像がありません</p> : (
        <ul className="Cards-list">
          {cards.map((card, index) =>
            <li key={card.id} className="Cards-item">
              <Card
                card={card}
                defaultCount={defaultCount}
                setCount={updateCardCount.bind(null, index)}
                remove={removeCard.bind(null, index)}
              />
            </li>
          )}
        </ul>
      )}
      <div className="Cards-footer">
        <AddCard add={addCards} />
      </div>
      <div
        className={['Cards-overlay', isDraging ? 'Cards-overlay-draging' : ''].join(' ')}
        onDragOver={preventDefault}
      >
        {'ここに画像をドロップ'}
      </div>
    </div>
  )
}
