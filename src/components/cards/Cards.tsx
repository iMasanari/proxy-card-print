import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { cardsState, useCardsActions } from '~/modules/cards'
import { defaultCountState } from '~/modules/settings'
import classList from '~/utils/classList'
import AddCard from './AddCard'
import Card from './Card'

require('./Cards.css')

const preventDefault = (e: Pick<Event, 'preventDefault'>) => {
  e.preventDefault()
}

export default () => {
  const cards = useRecoilValue(cardsState)
  const defaultCount = useRecoilValue(defaultCountState)
  const { add, updateCount, updateSrc, remove } = useCardsActions()
  const [isDraging, setDraging] = useState(false)

  useEffect(() => {
    const bodyListener = (e: Event) => {
      setDraging(e.type === 'dragover')
    }

    const body = document.body

    body.addEventListener('dragover', bodyListener)
    body.addEventListener('dragleave', bodyListener)

    // destructor
    return () => {
      body.removeEventListener('dragover', bodyListener)
      body.removeEventListener('dragleave', bodyListener)
    }
  }, [])

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const srcList = Array.from(e.dataTransfer!.files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => URL.createObjectURL(file))

    add(srcList)
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
                setCount={count => updateCount(index, count)}
                setSrc={src => updateSrc(index, src)}
                remove={() => remove(index)}
              />
            </li>
          )}
        </ul>
      )}
      <div className="Cards-footer">
        <AddCard add={add} />
      </div>
      <div
        className={classList('Cards-overlay', isDraging && 'Cards-overlay-draging')}
        onDragOver={preventDefault}
      >
        {'ここに画像をドロップ'}
      </div>
    </div>
  )
}
