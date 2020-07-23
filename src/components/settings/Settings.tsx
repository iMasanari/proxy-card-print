import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import NumberFild from '~/components/atoms/NumberFild'
import { Asset, assets, assetState, cardHeightState, cardWidthState, defaultCountState } from '~/modules/settings'

require('./Settings.css')

const cardSizes = {
  '59mm x 86mm': [59, 86] as [number, number],
  '63mm x 88mm': [63, 88] as [number, number],
}

export type CardSize = keyof typeof cardSizes | 'custom'

export default () => {
  const [cardSize, setCardSize] = useState<CardSize>('59mm x 86mm')

  const [cardWidth, setCardWidth] = useRecoilState(cardWidthState)
  const [cardHeight, setCardHeight] = useRecoilState(cardHeightState)
  const [asset, setAsset] = useRecoilState(assetState)
  const [defaultCount, setDefaultCount] = useRecoilState(defaultCountState)

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
          value={asset}
          onChange={e => setAsset(e.currentTarget.value as Asset)}
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
            value={cardWidth}
            setValue={setCardWidth}
          />
          {'mm x '}
          <NumberFild
            type="number"
            min="1"
            max="150"
            value={cardHeight}
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
          value={defaultCount}
          setValue={defaultCount => setDefaultCount(defaultCount)}
        />
        {'枚ずつ'}
      </div>
    </div>
  )
}
