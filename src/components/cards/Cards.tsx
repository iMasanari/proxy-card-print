import { css, Theme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import AddCard from './AddCard'
import Card from './Card'
import DragOverlay from './DragOverlay'
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
  padding: ${theme.spacing(1)};
  background-color: #fff;
`

const Cards = () => {
  const cards = useRecoilValue(cardsState)
  const defaultCount = useRecoilValue(defaultCountState)
  const { add, updateCount, updateSrc, remove } = useCardsActions()
  const [isDraging, setDraging] = useState(false)

  useEffect(() => {
    const onDragOver = (e: DragEvent) => {
      const data = e.dataTransfer

      if (data && data.types.some(v => v === 'Files')) {
        e.preventDefault()
        setDraging(true)
      }
    }

    const onDragLeave = () => {
      setDraging(false)
    }

    const onDrop = (e: DragEvent) => {
      e.preventDefault()

      const fileList = Array.from(e.dataTransfer!.files)
        .filter(file => file.type.startsWith('image/'))

      add(fileList)
      setDraging(false)
    }

    const body = document.body

    body.addEventListener('dragover', onDragOver)
    body.addEventListener('dragleave', onDragLeave)
    body.addEventListener('drop', onDrop)

    // destructor
    return () => {
      body.removeEventListener('dragover', onDragOver)
      body.removeEventListener('dragleave', onDragLeave)
      body.removeEventListener('drop', onDrop)
    }
  }, [add])

  return (
    <div css={cardsStyle}>
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
      {isDraging && <DragOverlay />}
    </div>
  )
}

export default Cards
