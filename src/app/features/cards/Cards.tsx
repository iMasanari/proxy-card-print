import { css, Theme } from '@emotion/react'
import { Dispatch, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { addCardsAction, removeCardAction, SettingsCard, updateCardCountAction, updateCardDataAction } from './cardsReducer'
import { createImage } from './crop/getCroppedImage'
import AddCard from './parts/AddCard'
import Card from './parts/Card'
import DragOverlay from './parts/DragOverlay'
import { useAction } from '~/app/common/hooks/state'
import { createBlobURLRef } from '~/app/utils/blobUrlRef'

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
  const { t } = useTranslation()

  const addCards = useAction(addCardsAction, dispatch)
  const updateCardCount = useAction(updateCardCountAction, dispatch)
  const updateCardData = useAction(updateCardDataAction, dispatch)
  const removeCard = useAction(removeCardAction, dispatch)

  const add = useCallback(async (files: Blob[]) => {
    const images = files.filter(file => file.type.startsWith('image/'))

    const cards = await Promise.all(
      images.map(async (file) => {
        const fileRef = createBlobURLRef(file)

        const img = await createImage(fileRef.value)

        fileRef.revoke()

        return { file, width: img.width, height: img.height }
      })
    )

    addCards(cards)
  }, [addCards])

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

    const onDrop = async (e: DragEvent) => {
      e.preventDefault()

      setDraging(false)
      await add(Array.from(e.dataTransfer!.files))
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
    <div>
      {!cards.length ? <p css={emptyStyle}>{t('Cards.emptyCardImage', 'カード画像がありません')}</p> : (
        <ul css={listStyle}>
          {cards.map((card, index) =>
            <li key={card.id} css={itemStyle}>
              <Card
                card={card}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                setCount={count => updateCardCount(index, count)}
                setCardData={src => updateCardData(index, src)}
                remove={() => removeCard(index)}
              />
            </li>
          )}
        </ul>
      )}
      <div css={footerStyle}>
        <AddCard add={add} fullWidth showFab={!cards.length} />
      </div>
      {isDraging && <DragOverlay />}
    </div>
  )
}

export default Cards
