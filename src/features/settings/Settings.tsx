import { css, Theme } from '@emotion/react'
import { Add, Remove } from '@mui/icons-material'
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Select } from '@mui/material'
import React, { Dispatch } from 'react'
import NumberField from '~/common/atoms/NumberField'
import { useAction } from '~/common/hooks/state'
import { cardSizes, pageSizes } from '~/domains/settings'
import { SettingsState, updateSettingsAction } from '~/features/settings/settingsReducer'

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
        {form.cardSize === 'スモールサイズ' && (
          <FormHelperText>59mm x 86mm: 遊戯王、ヴァンガードなど</FormHelperText>
        )}
        {form.cardSize === 'スタンダードサイズ' && (
          <FormHelperText>63mm x 88mm: MTG、デュエマ、ポケカなど</FormHelperText>
        )}
      </FormControl>
      {form.cardSize === 'custom' && (
        <Grid container spacing={2} my={0}>
          <Grid item xs={6}>
            <NumberField
              spinButton={false}
              label="カード幅 (mm)"
              min={0}
              max={150}
              value={form.cardWidth}
              onChange={(e) => updateSettings('cardWidth', e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" aria-label="減らす" onClick={() => updateSettings('cardWidth', `${Math.max(+form.cardWidth - 1, 0)}`)} >
                      <Remove />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="増やす" onClick={() => updateSettings('cardWidth', `${+form.cardWidth + 1}`)}>
                      <Add />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <NumberField
              spinButton={false}
              label="カード縦 (mm)"
              min={0}
              max={150}
              value={form.cardHeight}
              onChange={(e) => updateSettings('cardHeight', e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" aria-label="減らす" onClick={() => updateSettings('cardHeight', `${Math.max(+form.cardHeight - 1, 0)}`)} >
                      <Remove />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="増やす" onClick={() => updateSettings('cardHeight', `${+form.cardHeight + 1}`)}>
                      <Add />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )}
      <NumberField
        spinButton={false}
        label="カード印刷数"
        min={0}
        max={150}
        value={form.cardInitCount}
        onChange={(e) => updateSettings('cardInitCount', e.target.value)}
        size="small"
        sx={{ mt: 2 }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton edge="start" aria-label="減らす" onClick={() => updateSettings('cardInitCount', `${Math.max(+form.cardInitCount - 1, 0)}`)} >
                <Remove />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              枚ずつ
              <IconButton edge="end" aria-label="増やす" onClick={() => updateSettings('cardInitCount', `${+form.cardInitCount + 1}`)}>
                <Add />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default Settings
