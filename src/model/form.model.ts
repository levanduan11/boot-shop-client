export interface ForgotPassFinish {
  key: string
  password: string
}
export interface ChangePassword {
  currentPassword: string
  newPassword: string
}

export interface RequestClient<D = any> {
  params?: any,
  data?: D
  requiredToken: boolean,
}