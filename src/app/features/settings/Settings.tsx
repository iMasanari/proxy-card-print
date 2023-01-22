import { css, Theme } from '@emotion/react'
import { Add, Remove } from '@mui/icons-material'
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Select } from '@mui/material'
import { Dispatch } from 'react'
import { useTranslation } from 'react-i18next'
import NumberField from '~/app/common/atoms/NumberField'
import { useAction } from '~/app/common/hooks/state'
import { SettingsState, updateSettingsAction } from '~/app/features/settings/settingsReducer'
import { cardSizes, pageSizes } from '~/domains/settings'


const settingStyle = (theme: Theme) => css`
  padding: ${theme.spacing(1)};
`

interface Props {
  form: SettingsState
  dispatch: Dispatch<any>
}

const Settings = ({ form, dispatch }: Props) => {
  const updateSettings = useAction(updateSettingsAction, dispatch)
  const { t } = useTranslation()

  return (
    <div css={settingStyle}>
      <FormControl variant="outlined" size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel>{t('Settings.paperSize', '用紙サイズ')}</InputLabel>
        <Select
          label={t('Settings.paperSize', '用紙サイズ')}
          value={form.pageSize}
          onChange={(e) => updateSettings('pageSize', e.target.value)}
          native
        >
          {Object.keys(pageSizes).map(v =>
            // t('Settings.paperSizeList.A4', 'A4')
            // t('Settings.paperSizeList.A4(縦)', 'A4(縦)')
            // t('Settings.paperSizeList.A3', 'A3')
            // t('Settings.paperSizeList.レターサイズ', 'レターサイズ')
            // t('Settings.paperSizeList.レターサイズ(縦)', 'レターサイズ(縦)')
            <option key={v} value={v}>
              {t('Settings.paperSizeList.' + v, v)}
            </option>
          )}
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel>{t('Settings.cardSize', 'カードサイズ')}</InputLabel>
        <Select
          label={t('Settings.cardSize', 'カードサイズ')}
          value={form.cardSize}
          onChange={(e) => updateSettings('cardSize', e.target.value)}
          native
        >
          {Object.keys(cardSizes).map(v =>
            // t('Settings.cardSizeList.スモールサイズ', 'スモールサイズ')
            // t('Settings.cardSizeList.スタンダードサイズ', 'スタンダードサイズ')
            <option key={v} value={v}>
              {t('Settings.cardSizeList.' + v, v)}
            </option>
          )}
          <option value="custom">{t('Settings.cardSizeCustom', 'カスタム')}</option>
        </Select>
        {form.cardSize === 'スモールサイズ' && (
          <FormHelperText>
            {t('Settings.cardSizeSmallDescription', '59mm x 86mm: 遊戯王、ヴァンガードなど')}
          </FormHelperText>
        )}
        {form.cardSize === 'スタンダードサイズ' && (
          <FormHelperText>
            {t('Settings.cardSizeStandardDescription', '63mm x 88mm: MTG、デュエマ、ポケカなど')}
          </FormHelperText>
        )}
      </FormControl>
      {form.cardSize === 'custom' && (
        <Grid container spacing={2} my={0}>
          <Grid item xs={6}>
            <NumberField
              spinButton={false}
              label={t('Settings.cardWidth', 'カード幅 (mm)')}
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
              label={t('Settings.cardHeight', 'カード縦 (mm)')}
              min={0}
              max={150}
              value={form.cardHeight}
              onChange={(e) => updateSettings('cardHeight', e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      edge="start"
                      aria-label={t('Settings.decrement', '減らす')!}
                      onClick={() => updateSettings('cardHeight', `${Math.max(+form.cardHeight - 1, 0)}`)}
                    >
                      <Remove />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label={t('Settings.increment', '増やす')!}
                      onClick={() => updateSettings('cardHeight', `${+form.cardHeight + 1}`)}
                    >
                      <Add />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Settings
