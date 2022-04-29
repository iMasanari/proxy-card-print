import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { KEY_RETURN, KEY_SPACE } from 'keycode-js'
import React, { useRef } from 'react'

const fileInputStyle = css`
  visibility: hidden;
  width: 0;
  height: 0;
`

interface Props {
  fullWidth?: boolean
  add: (fileList: Blob[]) => void
}

const AddCard = ({ add, fullWidth }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === KEY_RETURN || e.keyCode === KEY_SPACE) {
      e.preventDefault()
      fileRef.current?.click()
    }
  }

  const onFileChanhge = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const srcList = Array.from(currentTarget.files!)
      .filter(file => file.type.startsWith('image/'))

    add(srcList)

    currentTarget.value = ''
  }

  return (
    <Button variant="outlined" fullWidth={fullWidth} component="label" onKeyDown={onButtonKeyDown}>
      カード追加
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
  )
}

export default AddCard
