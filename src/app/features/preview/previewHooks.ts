import { useMemo } from 'react'
import { CardsState } from '../cards/cardsReducer'
import { SettingsState } from '../settings/settingsReducer'
import { PageSize, pageSizes } from '~/domains/settings'

const toInt = (str: string, defaultValue = NaN) =>
  /^([1-9][0-9]*|0)$/.test(str) ? +str : defaultValue

export const usePreviewData = (settingsForm: SettingsState, cardsForm: CardsState) => {
  const settings = useMemo(() => {
    const pageSize = pageSizes[settingsForm.pageSize as PageSize] ? settingsForm.pageSize as PageSize : 'A4'
    const [pageWidth, pageHeight] = pageSizes[pageSize]
    const cardWidth = Math.min(Math.max(1, toInt(settingsForm.cardWidth, 0)), pageWidth)
    const cardHeight = Math.min(Math.max(1, toInt(settingsForm.cardHeight, 0)), pageHeight)

    const cards = cardsForm.map(card => ({
      ...card,
      count: toInt(card.count, 0),
    }))

    return {
      pageSize,
      pageWidth,
      pageHeight,
      cardWidth,
      cardHeight,
      cards,
    }
  }, [settingsForm, cardsForm])

  return settings
}
