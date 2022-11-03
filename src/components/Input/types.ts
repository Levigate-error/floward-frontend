export type InputProps = {
  value: string | number
  onInput?: (value: string) => void
  onChange?: (value: string) => void
  placeholder?: string
  nativePlaceholder?: string
  useOnlyNativePlaceholder?: boolean
  passwordVisible?: boolean
  type?: 'number' | 'text' | 'password' | 'email' | 'textarea'
  onTogglePassword?: () => void
  noNewLine?: boolean
  readonly?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  onChangeError?: (value: boolean) => void
}
