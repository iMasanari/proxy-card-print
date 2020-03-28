import React from 'react'
import AddCard from './AddCard'
import { CardType } from './App'
import Card from './Card'

require('./Cards.css')

interface Props {
  cards: CardType[]
  defaultCount: number | null
  addCards: (srcList: string[]) => void
  updateCardCount: (index: number, count: number | null) => void
  removeCard: (index: number) => void
}

export default ({ cards, defaultCount, addCards, updateCardCount, removeCard }: Props) =>
  <div className="Cards">
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
  </div>
