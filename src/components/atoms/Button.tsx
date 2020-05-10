import React from 'react'
import classList from '~/utils/classList'

require('./Button.css')

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default ({ value, onClick, className, children, ...rest }: Props) =>
  <button
    {...rest}
    className={classList('Button', className)}
    onClick={onClick}
  >
    {children}
  </button>
