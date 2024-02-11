import { css } from '@emotion/react'
import { AddPhotoAlternate as AddPhotoAlternateIcon } from '@mui/icons-material'
import { Button, Fab, Theme, useScrollTrigger, Zoom } from '@mui/material'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const fileInputStyle = css`
  visibility: hidden;
  width: 0;
  height: 0;
`

const favStyle = (theme: Theme) => css`
  position: fixed;
  bottom: ${theme.spacing(2)};
  right: ${theme.spacing(2)};
`

interface Props {
  fullWidth?: boolean
  add: (fileList: Blob[]) => Promise<void>
  showFab: boolean
}

const AddCard = ({ add, fullWidth, showFab }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const { t } = useTranslation()

  const onFabButtonClick = () => {
    fileRef.current?.click()
  }

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      fileRef.current?.click()
    }
  }

  const onFileChanhge = async ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(currentTarget.files!)

    currentTarget.value = ''

    await add(files)
  }

  return (
    <>
      <Button variant="outlined" startIcon={<AddPhotoAlternateIcon />} fullWidth={fullWidth} component="label" onKeyDown={onButtonKeyDown}>
        {t('AddCard.addCard', 'カード追加')}
        <input
          type="file"
          css={fileInputStyle}
          accept="image/*"
          multiple
          ref={fileRef}
          tabIndex={-1}
          onChange={onFileChanhge}
        />
      </Button>
      {showFab &&
        <Zoom appear={false} in={trigger}>
          <Fab
            css={favStyle}
            onClick={onFabButtonClick}
            aria-label={t('AddCard.addCard', 'カード追加')!}
            color="primary"
          >
            <AddPhotoAlternateIcon />
          </Fab>
        </Zoom>
      }
    </>
  )
}

export default AddCard
