import { TextField, TextFieldProps } from '@mui/material'

type Props = TextFieldProps & {
  min?: number
  max?: number
}

const NumberField = ({ min, max, required, inputProps, ...props }: Props) => {
  const isError = !/^(0|[1-9]\d*)$/.test(props.value?.toString().trim() || '0') || (required && props.value === '')

  return (
    <TextField
      error={isError}
      inputProps={{
        sx: {
          textAlign: 'right',
          color: isError ? 'error.main' : undefined,
          ...inputProps?.sx,
        },
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
