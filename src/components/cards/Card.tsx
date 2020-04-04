import React from 'react'
import NumberFild from '../atoms/NumberFild'

require('./Card.css')

export interface CardType {
  id: string
  src: string
  count: number | null
}

interface Props {
  card: CardType
  defaultCount: number | null
  setCount: (count: number | null) => void
  remove: () => void
}

export default ({ card, defaultCount, setCount, remove }: Props) =>
  <div className="Card">
    <div className="Card-thumb" style={{ backgroundImage: card.src ? `url(${card.src})` : undefined }}></div>
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
      <button onClick={remove}>削除</button>
    </div>
  </div>
