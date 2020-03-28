import React from 'react'
import { CardType } from './App'
import NumberFild from './NumberFild'

require('./Card.css')

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
        placeholder={defaultCount as any ?? ''}
        value={card.count}
        setValue={setCount}
      />
      {'枚'}
    </div>
    <div>
      <button onClick={remove}>削除</button>
    </div>
  </div>
