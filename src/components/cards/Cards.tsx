import { css, Theme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import AddCard from './AddCard'
import Card from './Card'
import { cardsState, useCardsActions } from '~/modules/cards'
import { defaultCountState } from '~/modules/settings'

const cardsStyle = css`
  position: relative;
  @media (min-width: 600px) {
      flex: 1;
      overflow: auto;
  }
`

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
`

const itemStyle = css`
  margin: 0.5rem 0;
`

const emptyStyle = css`
  margin: 0.5rem;
  text-align: center;
`

const footerStyle = (theme: Theme) => css`
  position: sticky;
  bottom: 0;
  padding: ${theme.spacing(0, 1)};
`

const overlayStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 4px dashed #666;
  border-radius: 20px;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  color: #666;
  pointer-events: none;
`

const preventDefault = (e: Pick<Event, 'preventDefault'>) => {
  e.preventDefault()
}

const Cards = () => {
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
    <div css={cardsStyle} onDragOver={preventDefault} onDrop={onDrop}>
      {!cards.length ? <p css={emptyStyle}>カード画像がありません</p> : (
        <ul css={listStyle}>
          {cards.map((card, index) =>
            <li key={card.id} css={itemStyle}>
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
      <div css={footerStyle}>
        <AddCard add={add} fullWidth />
      </div>
      {isDraging && (
        <div css={[overlayStyle]} onDragOver={preventDefault}>
          ここに画像をドロップ
        </div>
      )}
    </div>
  )
}

export default Cards
