import { CSSProperties } from 'react';

export type ButtonStyleTypes = 'primary' | 'danger'

export type ButtonProps = {
  className?: string
  blinking?: boolean
  styleType?: ButtonStyleTypes
  disabled?: boolean
  fw?: boolean
  even?: boolean
  type?: 'button' | 'submit',
  onClick?: () => void
  href?: string
  style?: CSSProperties
}
