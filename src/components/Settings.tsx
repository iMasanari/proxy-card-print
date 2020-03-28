import React from 'react'

require('./Setting.css')

export const assets = {
  A4: { size: 'A4', orientation: 'portrait' },
  A3: { size: 'A3', orientation: 'landscape' },
} as const

export type Asset = keyof typeof assets

interface Props {
  asset: Asset
  setAsset: (asset: Asset) => void
}

export default ({ asset, setAsset }: Props) =>
  <div className="Setting">
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
