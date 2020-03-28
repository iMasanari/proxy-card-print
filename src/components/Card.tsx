import React from 'react'
import { CardType } from './App'

require('./Card.css')

interface Props {
  card: CardType
  setCount: (count: number | null) => void
  remove: () => void
}

const toNumberOrNull = (str: string) =>
  str !== '' && !isNaN(str as any) ? +str : null

export default ({ card, setCount, remove }: Props) =>
  <div className="Card">
    <div className="Card-thumb" style={{ backgroundImage: card.src ? `url(${card.src})` : undefined }}></div>
    <div>
      <input
        type="number"
        className="Card-count"
        min="0"
        value={card.count ?? ''}
        onChange={e => setCount(toNumberOrNull(e.currentTarget.value))}
      />
      {'枚'}
    </div>
    <div>
      <button onClick={remove}>削除</button>
    </div>
  </div>
