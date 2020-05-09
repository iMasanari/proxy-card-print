import React from 'react'

require('./Button.css')

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default ({ value, onClick, className, children, ...rest }: Props) =>
  <button
    {...rest}
    className={['Button', className || ''].join(' ')}
    onClick={onClick}
  >
    {children}
  </button>
