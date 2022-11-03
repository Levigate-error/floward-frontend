export type LoginProps = {
  email: string
  password: string
  isRemembered: boolean
}

export type User = {
  authenticated: boolean
  token: string | null
}

export type AuthState = {
  user: User | null
  initialUserFetch: boolean
  backendNoResponse: boolean
}
