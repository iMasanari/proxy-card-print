import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'

type Props = TextFieldProps & {
  min?: number
  max?: number
}

const NumberField = ({ min, max, inputProps, ...props }: Props) => {
  return (
    <TextField
      type="number"
      inputProps={{
        sx: { textAlign: 'right' },
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
