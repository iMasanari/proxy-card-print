import React from 'react'
import { CardType } from './App'
import Card from './Card'

interface Props {
  cards: CardType[]
  updateCardFile: (index: number, file: File | undefined) => void
  updateCardCount: (index: number, count: number | null) => void
  removeCard: (index: number) => void
}

export default ({ cards, updateCardFile, updateCardCount, removeCard }: Props) =>
  <ul>
    {cards.map((card, index) =>
      <li key={card.id}>
        <Card
          card={card}
          setFile={updateCardFile.bind(null, index)}
          setCount={updateCardCount.bind(null, index)}
          remove={removeCard.bind(null, index)}
        />
      </li>
    )}
  </ul>
