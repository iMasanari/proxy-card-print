import { css, Theme } from '@emotion/react'
import { FormControl, InputAdornment, InputLabel, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import NumberField, { toNumberOrNull } from '~/components/atoms/NumberField'
import { Asset, assets, assetState, cardHeightState, cardWidthState, defaultCountState } from '~/modules/settings'

const settingStyle = (theme: Theme) => css`
  padding: ${theme.spacing(1)};
`

const cardSizes = {
  '59mm x 86mm': [59, 86] as [number, number],
  '63mm x 88mm': [63, 88] as [number, number],
}

export type CardSize = keyof typeof cardSizes | 'custom'

const Settings = () => {
  const [cardSize, setCardSize] = useState<CardSize>('59mm x 86mm')

  const [cardWidth, setCardWidth] = useRecoilState(cardWidthState)
  const [cardHeight, setCardHeight] = useRecoilState(cardHeightState)
  const [asset, setAsset] = useRecoilState(assetState)
  const [defaultCount, setDefaultCount] = useRecoilState(defaultCountState)

  const updateCardSize = (e: React.ChangeEvent<{ value: CardSize }>) => {
    const value = e.currentTarget.value

    setCardSize(value)

    if (value !== 'custom') {
      const [width, height] = cardSizes[value]

      setCardWidth(width)
      setCardHeight(height)
    }
  }

  return (
    <div css={settingStyle}>
      <FormControl variant="outlined" size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel>用紙サイズ</InputLabel>
        <Select
          label="用紙サイズ"
          value={asset}
          onChange={e => setAsset(e.currentTarget.value as Asset)}
          native
        >
          {Object.keys(assets).map(v =>
            <option key={v} value={v}>{v}</option>
          )}
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel>カードサイズ</InputLabel>
        <Select
          label="カードサイズ"
          value={cardSize}
          onChange={updateCardSize}
          native
        >
          {Object.keys(cardSizes).map(v =>
            <option key={v} value={v}>{v}</option>
          )}
          <option value="custom">カスタム</option>
        </Select>
      </FormControl>
      {cardSize === 'custom' && (
        <div>
          <NumberField
            label="幅"
            min={0}
            max={150}
            value={cardWidth ?? ''}
            onChange={e => setCardWidth(toNumberOrNull(e.currentTarget.value))}
            size="small"
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {'mm'}
                </InputAdornment>
              ),
            }}
          />
          <NumberField
            label="縦"
            min={0}
            max={150}
            value={cardHeight ?? ''}
            onChange={e => setCardHeight(toNumberOrNull(e.currentTarget.value))}
            size="small"
            sx={{ mt: 2, ml: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {'mm'}
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}
      <NumberField
        label="カード印刷数"
        min={0}
        max={150}
        value={defaultCount ?? ''}
        onChange={e => setDefaultCount(toNumberOrNull(e.currentTarget.value))}
        size="small"
        sx={{ mt: 2 }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {'枚ずつ'}
            </InputAdornment>
          ),
        }}
        inputProps={{
          min: 0,
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
      />
    </div>
  )
}

export default Settings
