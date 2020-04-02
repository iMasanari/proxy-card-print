import React, { useRef } from 'react'

require('./AddCard.css')

interface Props {
  add: (srcList: string[]) => void
}

export default ({ add }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    // enter or space
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault()
      fileRef.current?.click()
    }
  }

  const onFileChanhge = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const srcList = Array.from(currentTarget.files!)
      .filter(file => file.type.startsWith('image/'))
      .map(URL.createObjectURL)

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