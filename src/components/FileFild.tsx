import React from 'react'

interface Props extends React.HTMLProps<HTMLInputElement> {
  setFile: (file: File | undefined) => void
}

export default ({ setFile, ...rest }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0]
    setFile(file)
  }

  return (
    <input {...rest} type="file" onChange={onChange} />
  )
}
