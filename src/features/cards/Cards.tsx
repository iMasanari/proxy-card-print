import { css, Theme } from '@emotion/react'
import React, { Dispatch, useEffect, useState } from 'react'
import { addCardsAction, removeCardAction, SettingsCard, updateCardCountAction, updateCardFileAction } from './cardsReducer'
import AddCard from './parts/AddCard'
import Card from './parts/Card'
import DragOverlay from './parts/DragOverlay'
import { useAction } from '~/common/hooks/state'

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

interface Props {
  cards: SettingsCard[]
  cardWidth: number
  cardHeight: number
  dispatch: Dispatch<any>
}

const Cards = ({ cards, cardWidth, cardHeight, dispatch }: Props) => {
  const [isDraging, setDraging] = useState(false)

  const addCards = useAction(addCardsAction, dispatch)
  const updateCardCount = useAction(updateCardCountAction, dispatch)
  const updateCardFile = useAction(updateCardFileAction, dispatch)
  const removeCard = useAction(removeCardAction, dispatch)

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

      addCards(fileList)
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
  }, [addCards])

  return (
    <div>
      {!cards.length ? <p css={emptyStyle}>カード画像がありません</p> : (
        <ul css={listStyle}>
          {cards.map((card, index) =>
            <li key={card.id} css={itemStyle}>
              <Card
                card={card}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                setCount={count => updateCardCount(index, count)}
                setFile={src => updateCardFile(index, src)}
                remove={() => removeCard(index)}
              />
            </li>
          )}
        </ul>
      )}
      <div css={footerStyle}>
        <AddCard add={addCards} fullWidth />
      </div>
      {isDraging && <DragOverlay />}
    </div>
  )
}

export default Cards
