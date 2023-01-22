import { css } from '@emotion/react'
import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'

type Props = TextFieldProps & {
  min?: number
  max?: number
  spinButton?: boolean
}

const noSpinButtonStyle = css`
  & input {
    -moz-appearance: textfield;
  }
  & input::-webkit-inner-spin-button,
  & input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const NumberField = ({ min, max, spinButton, inputProps, ...props }: Props) => {
  return (
    <TextField
      type="number"
      css={spinButton === false && noSpinButtonStyle}
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
