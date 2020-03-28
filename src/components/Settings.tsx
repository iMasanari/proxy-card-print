import React from 'react'

require('./Settings.css')

export const assets = {
  A4: { size: 'A4', orientation: 'portrait' },
  'A4(横)': { size: 'A4', orientation: 'landscape' },
  A3: { size: 'A3', orientation: 'landscape' },
} as const

export type Asset = keyof typeof assets

export const cardSizes = {
  '59mm x 86mm': [59, 86] as [number, number],
  '63mm x 88mm': [63, 88] as [number, number],
}

export type CardSize = keyof typeof cardSizes

interface Props {
  cardSize: CardSize
  setCardSize: (cardSize: CardSize) => void
  asset: Asset
  setAsset: (asset: Asset) => void
}

export default ({ cardSize, setCardSize, asset, setAsset }: Props) =>
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
        onChange={e => setCardSize(e.currentTarget.value as CardSize)}
      >
        {Object.keys(cardSizes).map(v =>
          <option key={v} value={v}>{v}</option>
        )}
      </select>
    </div>
  </div>
