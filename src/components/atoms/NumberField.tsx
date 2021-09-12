import { css } from '@emotion/react'
import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { useClassName } from '~/utils/useClassName'

export const toNumberOrNull = (str: string) =>
  str !== '' && !isNaN(str as any) ? +str : null

const numberInputStyle = css`
  text-align: right;
`

type Props = TextFieldProps & {
  min?: number
  max?: number
}

const NumberField = ({ min, max, inputProps, ...props }: Props) => {
  const numberInputClassName = useClassName(numberInputStyle)

  return (
    <TextField
      type="number"
      inputProps={{
        className: numberInputClassName,
        inputMode: 'numeric',
        pattern: '[0-9]*',
        min,
        max,
        ...inputProps,
      }}
      {...props}
    />
  )
}

export default NumberField
