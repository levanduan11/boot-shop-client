import { RootState } from "@/config/store"
import { createSlice } from "@reduxjs/toolkit"

interface ForgotPasswordState {
  success: boolean,
  message?: string,
  loading?: boolean
}

const initialState: ForgotPasswordState = {
  success: false,
  message: '',
  loading: false,
}

const forgotPasswordSlice = createSlice({
  name: 'forgot-password',
  initialState,
  reducers: {
    forgotPasswordInitReq: (state) => {
      state.loading = true
    },
    forgotPasswordInitSuccess: (state) => {
      state.loading = false
      state.success = true
    },
    forgotPasswordIniFail: (state) => {
      state.loading = false
      state.success = false
    },
    forgotPasswordFinishInitReq: (state) => {
      state.loading = true
    },
    forgotPasswordFinishInitSuccess: (state) => {
      state.loading = false
      state.success = true
    },
    forgotPasswordFinishInitFail: (state) => {
      state.loading = false
      state.success = false
    },
  }
})

export const {
  forgotPasswordIniFail,
  forgotPasswordInitSuccess,
  forgotPasswordInitReq,
  forgotPasswordFinishInitReq,
  forgotPasswordFinishInitSuccess,
  forgotPasswordFinishInitFail,
} = forgotPasswordSlice.actions

const forgotPasswordReducer = forgotPasswordSlice.reducer
export default forgotPasswordReducer
export const forgotPasswordSelector = (state: RootState) => state.forgotPassword