import { KEY_RETURN, KEY_SPACE } from 'keycode-js'
import React, { useRef } from 'react'

// require('./AddCard.css')

interface Props {
  add: (srcList: string[]) => void
}

export default ({ add }: Props) => {
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
      .map(file => URL.createObjectURL(file))

    add(srcList)

    currentTarget.value = ''
  }

  return (
    <label className="AddCard" role="button" tabIndex={0} onKeyDown={onButtonKeyDown}>
      {'カード追加'}
      <input
        type="file"
        className="AddCard-file"
        accept="image/*"
        multiple
        ref={fileRef}
        tabIndex={-1}
        onChange={onFileChanhge}
      />
    </label>
  )
}
