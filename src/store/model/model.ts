export interface Login {
  username: string,
  password: string,
  rememberMe: boolean
}
export interface ResetRq {
  oldPass: string
  newPass: string
  username?:string
}
export interface ApiResponse {
  status: boolean,
  message?: string,
  data?: any,
  errors?:Entry
}
export interface Activation {
  token: string
}
export interface JwtResponse {
  token: string
}
export interface LoginResponse {
  token: string,
  refreshToken:string,
  firstLogin: boolean
}
export interface ErrorResponse {
  message: string
}
export interface BodyData<T> {
  data?: T
}
export interface HeaderData<T> {
  params?: T
}
interface Entry {
  [key: string]: any
}

