import React from 'react'
import classList from '~/utils/classList'

// require('./NumberFild.css')

const toNumberOrNull = (str: string) =>
  str !== '' && !isNaN(str as any) ? +str : null

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: number | null
  setValue: (value: number | null) => void
}

export default ({ value, setValue, className, ...rest }: Props) =>
  <input
    {...rest}
    type="number"
    className={classList('NumberFild', className)}
    value={value ?? ''}
    onChange={e => setValue(toNumberOrNull(e.currentTarget.value))}
  />
