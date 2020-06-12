import React, { useState } from 'react'
import NumberFild from '~/components/atoms/NumberFild'
import { Asset, assets, setAsset, setDefaultCount, SettingsType, updateCardHeight, updateCardWidth } from '~/modules/settings'

require('./Settings.css')

const cardSizes = {
  '59mm x 86mm': [59, 86] as [number, number],
  '63mm x 88mm': [63, 88] as [number, number],
}

export type CardSize = keyof typeof cardSizes | 'custom'

interface Props {
  settings: SettingsType
  dispatch: React.Dispatch<any>
}

export default ({ settings, dispatch }: Props) => {
  const [cardSize, setCardSize] = useState<CardSize>('59mm x 86mm')

  const setCardWidth = (width: number | null) => dispatch(updateCardWidth(width || 0))
  const setCardHeight = (height: number | null) => dispatch(updateCardHeight(height || 0))

  const updateCardSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as CardSize

    setCardSize(value)

    if (value !== 'custom') {
      const [width, height] = cardSizes[value]

      setCardWidth(width)
      setCardHeight(height)
    }
  }

  return (
    <div className="Setting">
      <div>
        {'用紙サイズ: '}
        <select
          className="Setting-select"
          value={settings.asset}
          onChange={e => dispatch(setAsset(e.currentTarget.value as Asset))}
        >
          {Object.keys(assets).map(v =>
            <option key={v} value={v}>{v}</option>
          )}
        </select>
      </div>
      <div>
        {'カードサイズ: '}
        <select
          className="Setting-select"
          value={cardSize}
          onChange={updateCardSize}
        >
          {Object.keys(cardSizes).map(v =>
            <option key={v} value={v}>{v}</option>
          )}
          <option value="custom">カスタム</option>
        </select>
      </div>
      {cardSize === 'custom' && (
        <div>
          <NumberFild
            type="number"
            min="1"
            max="150"
            value={settings.cardWidth}
            setValue={setCardWidth}
          />
          {'mm x '}
          <NumberFild
            type="number"
            min="1"
            max="150"
            value={settings.cardHeight}
            setValue={setCardHeight}
          />
          {'mm'}
        </div>
      )}
      <div>
        {'カード印刷数: '}
        <NumberFild
          type="number"
          min="0"
          value={settings.defaultCount}
          setValue={defaultCount => dispatch(setDefaultCount(defaultCount))}
        />
        {'枚ずつ'}
      </div>
    </div>
  )
}
