import { useMemo } from 'react'
import { CardsState } from '../cards/cardsReducer'
import { SettingsState } from '../settings/settingsReducer'
import { PageSize, pageSizes, type PreviewData } from '~/domains/settings'

const toInt = (str: string, defaultValue = NaN) =>
  /^([1-9][0-9]*|0)$/.test(str) ? +str : defaultValue

const pageMargin = 7

export const usePreviewData = (settingsForm: SettingsState, cardsForm: CardsState): PreviewData => {
  const settings = useMemo(() => {
    const pageSize = pageSizes[settingsForm.pageSize as PageSize] ? settingsForm.pageSize as PageSize : 'A4'
    const [_pageWidth, _pageHeight] = pageSizes[pageSize]
    const gap = toInt(settingsForm.gap, 0)

    const printableWidth = _pageWidth - (pageMargin + 1) * 2
    const printableHeight = _pageHeight - (pageMargin + 1) * 2

    const cardWidth = Math.min(Math.max(1, toInt(settingsForm.cardWidth, 0)), printableWidth)
    const cardHeight = Math.min(Math.max(1, toInt(settingsForm.cardHeight, 0)), printableHeight)

    const colCount1 = Math.floor((printableWidth + gap) / (cardWidth + gap))
    const rowCount1 = Math.floor((printableHeight + gap) / (cardHeight + gap))
    const colCount2 = Math.floor((printableHeight + gap) / (cardWidth + gap))
    const rowCount2 = Math.floor((printableWidth + gap) / (cardHeight + gap))

    const isLandscape = colCount1 * rowCount1 > colCount2 * rowCount2

    const pageWidth = isLandscape ? _pageWidth : _pageHeight
    const pageHeight = isLandscape ? _pageHeight : _pageWidth
    const colCount = isLandscape ? colCount1 : colCount2
    const rowCount = isLandscape ? rowCount1 : rowCount2

    const cards = cardsForm.flatMap(card =>
      [...Array(toInt(card.count, 0)).keys()].map(i => ({
        id: `${card.id}-${i}`,
        data: card.data,
      }))
    )

    return {
      pageSize,
      pageWidth,
      pageHeight,
      pageMargin,
      gap,
      colCount,
      rowCount,
      cardWidth,
      cardHeight,
      cards,
    }
  }, [settingsForm, cardsForm])

  return settings
}
