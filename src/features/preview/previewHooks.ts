import { useMemo } from 'react'
import { CardsState } from '../cards/cardsReducer'
import { SettingsState } from '../settings/settingsReducer'
import { PageSize, pageSizes } from '~/domains/settings'

const toInt = (str: string, defaultValue = NaN) =>
  /^[1-9]*[0-9]$/.test(str) ? +str : defaultValue

export const usePreviewData = (settingsForm: SettingsState, cardsForm: CardsState) => {
  const settings = useMemo(() => {
    const [pageWidth, pageHeight] = pageSizes[settingsForm.pageSize as PageSize] || pageSizes['A4']
    const cardWidth = Math.min(Math.max(1, toInt(settingsForm.cardWidth, 0)), pageWidth)
    const cardHeight = Math.min(Math.max(1, toInt(settingsForm.cardHeight, 0)), pageHeight)
    const cardInitCount = toInt(settingsForm.cardInitCount, 0)

    const cards = cardsForm.map(card => ({
      ...card,
      count: toInt(card.count, cardInitCount),
    }))

    return {
      pageWidth,
      pageHeight,
      cardWidth,
      cardHeight,
      cards,
      cardInitCount,
    }
  }, [settingsForm, cardsForm])

  return settings
}
