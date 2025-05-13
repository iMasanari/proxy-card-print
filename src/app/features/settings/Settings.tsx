import { css, Theme } from '@emotion/react'
import { Add, ExpandMore, Remove } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Select, Typography } from '@mui/material'
import { Dispatch } from 'react'
import { useTranslation } from 'react-i18next'
import NumberField from '~/app/common/atoms/NumberField'
import { useAction } from '~/app/common/hooks/state'
import { SettingsState, updateSettingsAction } from '~/app/features/settings/settingsReducer'
import { cardSizes, pageSizes } from '~/domains/settings'

const settingStyle = (theme: Theme) => css`
  padding: ${theme.spacing(0, 1)};
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
            // t('Settings.paperSizeList.B4 (JIS)', 'B4 (JIS)')
            // t('Settings.paperSizeList.A3', 'A3')
            // t('Settings.paperSizeList.レターサイズ', 'レターサイズ')
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
            {t('Settings.cardSizeSmallDescription', '59mm x 86mm: 遊戯王/ヴァンガード等')}
          </FormHelperText>
        )}
        {form.cardSize === 'スタンダードサイズ' && (
          <FormHelperText>
            {t('Settings.cardSizeStandardDescription', '63mm x 88mm: ワンピ/デュエマ/ポケカ等')}
          </FormHelperText>
        )}
      </FormControl>
      {form.cardSize === 'custom' && (
        <Grid container spacing={2} my={0}>
          <Grid item xs={6}>
            <NumberField
              label={t('Settings.cardWidth', 'カード幅 (mm)')}
              required
              min={0}
              max={150}
              value={form.cardWidth}
              onChange={(e) => updateSettings('cardWidth', e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" aria-label="減らす" onClick={() => updateSettings('cardWidth', `${Math.max(parseInt(form.cardWidth) - 1, 0)}`)} >
                      <Remove />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="増やす" onClick={() => updateSettings('cardWidth', `${parseInt(form.cardWidth) + 1}`)}>
                      <Add />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <NumberField
              label={t('Settings.cardHeight', 'カード縦 (mm)')}
              required
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
                      onClick={() => updateSettings('cardHeight', `${Math.max(parseInt(form.cardHeight) - 1, 0)}`)}
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
                      onClick={() => updateSettings('cardHeight', `${parseInt(form.cardHeight) + 1}`)}
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
      <div css={theme => css`margin-top: ${theme.spacing(1)};`}>
        <Accordion variant="outlined">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography component="span">{t('Settings.detailSetting', '詳細設定')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} my={0}>
              <Grid item xs={6}>
                <NumberField
                  label={t('Settings.pageMargin', '用紙余白 (mm)')}
                  required
                  min={0}
                  max={50}
                  value={form.pageMargin}
                  onChange={(e) => updateSettings('pageMargin', e.target.value)}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          edge="start"
                          aria-label={t('Settings.decrement', '減らす')!}
                          onClick={() => updateSettings('pageMargin', `${Math.max(parseInt(form.pageMargin || '0') - 1, 0)}`)}
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
                          onClick={() => updateSettings('pageMargin', `${parseInt(form.pageMargin || '0') + 1}`)}
                        >
                          <Add />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <NumberField
                  label={t('Settings.gap', 'カード間隔 (mm)')}
                  min={0}
                  max={10}
                  placeholder="0"
                  value={form.gap}
                  onChange={(e) => updateSettings('gap', e.target.value)}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          edge="start"
                          aria-label={t('Settings.decrement', '減らす')!}
                          onClick={() => updateSettings('gap', `${Math.max(parseInt(form.gap || '0') - 1, 0)}`)}
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
                          onClick={() => updateSettings('gap', `${parseInt(form.gap || '0') + 1}`)}
                        >
                          <Add />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default Settings
