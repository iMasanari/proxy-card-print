import { css, Theme } from '@emotion/react'
import { FormControl, InputAdornment, InputLabel, Select } from '@mui/material'
import React, { Dispatch } from 'react'
import NumberField from '~/components/atoms/NumberField'
import { cardSizes, pageSizes } from '~/domains/settings'
import { useAction } from '~/hooks/state'
import { SettingsState, updateSettingsAction } from '~/modules/settings'

const settingStyle = (theme: Theme) => css`
  padding: ${theme.spacing(1)};
`

interface Props {
  form: SettingsState
  dispatch: Dispatch<any>
}

const Settings = ({ form, dispatch }: Props) => {
  const updateSettings = useAction(updateSettingsAction, dispatch)

  return (
    <div css={settingStyle}>
      <FormControl variant="outlined" size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel>用紙サイズ</InputLabel>
        <Select
          label="用紙サイズ"
          value={form.pageSize}
          onChange={(e) => updateSettings('pageSize', e.target.value)}
          native
        >
          {Object.keys(pageSizes).map(v =>
            <option key={v} value={v}>{v}</option>
          )}
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel>カードサイズ</InputLabel>
        <Select
          label="カードサイズ"
          value={form.cardSize}
          onChange={(e) => updateSettings('cardSize', e.target.value)}
          native
        >
          {Object.keys(cardSizes).map(v =>
            <option key={v} value={v}>{v}</option>
          )}
          <option value="custom">カスタム</option>
        </Select>
      </FormControl>
      {form.cardSize === 'custom' && (
        <div>
          <NumberField
            label="幅"
            min={0}
            max={150}
            value={form.cardWidth}
            onChange={(e) => updateSettings('cardWidth', e.target.value)}
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
            value={form.cardHeight}
            onChange={(e) => updateSettings('cardHeight', e.target.value)}
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
        value={form.cardInitCount}
        onChange={(e) => updateSettings('cardInitCount', e.target.value)}
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
      />
    </div>
  )
}

export default Settings
