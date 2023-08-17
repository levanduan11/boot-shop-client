import { RootState } from "@/config/store"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LoginResponse } from "../model/model"
import { stat } from "fs"


interface LoginState {
  token: string,
  loading: boolean,
  success: boolean,
  message?: string,
  firstLogin?: boolean,
}
const initialState: LoginState = {
  token: '',
  loading: false,
  success: false,
  message: '',
  firstLogin: false,
}
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      const {token,firstLogin}=action.payload
      if (firstLogin) {
        state.firstLogin=true
      } else {
        state.firstLogin = false
        state.token=token
      }
      state.loading = false
      state.success = true
    },
    loginFailure: (state) => {
      state.loading = false
      state.success = false
    },
    loginReset: (state) => {
      state.success=false
      state.loading=false
      state.token = ''
      state.message=''
    },
    loginAfterResetSuccess: (state) => {
      state.firstLogin=false
    }
  }
})

export const { loginRequest, loginSuccess, loginFailure,loginReset,loginAfterResetSuccess } = loginSlice.actions
export const loginSelector = (state:RootState)=>state.login
const loginReducer = loginSlice.reducer
export default loginReducer